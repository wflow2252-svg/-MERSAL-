import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST — إنشاء طلب جديد من صفحة الـ Checkout
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const customerId = (session?.user as any)?.id as string | undefined;

    if (!customerId) {
      return NextResponse.json(
        { error: "يجب تسجيل الدخول أولاً لإتمام الطلب" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      email,
      city,
      district,
      street,
      notes,
      paymentMethod = "COD",
      items,
      subtotal,
      shippingCost,
    } = body;

    // ── Validation ────────────────────────────────────────
    if (!phone || !city || !street) {
      return NextResponse.json(
        { error: "الهاتف والمدينة والعنوان مطلوبة" },
        { status: 400 }
      );
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "السلة فارغة — يجب إضافة منتج واحد على الأقل" },
        { status: 400 }
      );
    }

    // ── Validate & enrich items from DB ──────────────────
    // Fetch real product data to get vendorId and verify price
    const productIds = items.map((i: any) => i.productId).filter(Boolean);
    const dbProducts = productIds.length > 0
      ? await prisma.product.findMany({
          where: { id: { in: productIds } },
          select: { id: true, vendorId: true, price: true, title: true, stock: true },
        })
      : [];

    const productMap = Object.fromEntries(dbProducts.map(p => [p.id, p]));

    // Build order items — fallback to cart data if product not in DB (demo items)
    const orderItems = items.map((item: any) => {
      const dbProduct = productMap[item.productId];
      return {
        productId: item.productId,
        vendorId:  dbProduct?.vendorId || item.vendorId || "demo",
        quantity:  Math.max(1, parseInt(item.quantity) || 1),
        priceAtTime: dbProduct?.price || item.price || 0,
        size:  item.size  || null,
        color: item.color || null,
      };
    });

    // Filter out items without a real productId (demo items need special handling)
    const validItems = orderItems.filter(i => i.productId && i.vendorId !== "demo");
    const demoItems  = orderItems.filter(i => !i.productId || i.vendorId === "demo");

    // If ALL items are demo, still create the order but note it
    const createItems = validItems.length > 0 ? validItems : orderItems.slice(0, 1).map(i => ({
      ...i,
      vendorId: dbProducts[0]?.vendorId || (
        // Fallback: get any vendor from DB
        "system"
      ),
    }));

    const totalAmount = (subtotal || 0) + (shippingCost || 0);

    // ── If no real products found, try to get a placeholder vendor ────
    let finalItems = validItems;
    if (finalItems.length === 0) {
      // Get first available vendor as placeholder
      const anyVendor = await prisma.vendor.findFirst({ select: { id: true } });
      if (!anyVendor) {
        return NextResponse.json(
          { error: "لا يوجد موردون مسجلون في النظام بعد" },
          { status: 422 }
        );
      }
      finalItems = orderItems.map(i => ({ ...i, vendorId: anyVendor.id }));
    }

    // ── Create the order ─────────────────────────────────
    const order = await prisma.order.create({
      data: {
        customerId,
        customerName:  name  || session?.user?.name  || "",
        customerEmail: email || session?.user?.email || "",
        phone:   phone.trim(),
        city:    city.trim(),
        district: (district || city).trim(),
        street:  street.trim(),
        notes:   notes || null,
        paymentMethod,
        totalAmount,
        shippingCost: shippingCost || 0,
        status: "PENDING_APPROVAL",
        items: {
          create: finalItems,
        },
      },
      include: {
        items: {
          include: {
            product: { select: { title: true } },
            vendor:  { select: { storeName: true } },
          },
        },
      },
    });

    return NextResponse.json({
      success:  true,
      orderId:  order.id,
      itemCount: order.items.length,
      totalAmount: order.totalAmount,
    });

  } catch (error: any) {
    console.error("❌ Order creation error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الطلب: " + (error.message || "unknown error") },
      { status: 500 }
    );
  }
}

// GET — جلب طلبات المستخدم الحالي
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const customerId = (session?.user as any)?.id as string | undefined;

    if (!customerId) {
      return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: { select: { title: true, images: true } },
            vendor:  { select: { storeName: true } },
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("❌ Orders GET error:", error);
    return NextResponse.json(
      { error: "فشل جلب الطلبات: " + error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST — إنشاء طلب جديد من صفحة الـ Checkout
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
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
      items,        // [{ productId, vendorId, quantity, price, size?, color? }]
      subtotal,
      shippingCost,
    } = body;

    // Validation
    if (!phone || !city || !street || !items?.length) {
      return NextResponse.json(
        { error: "بيانات ناقصة — الهاتف والمدينة والعنوان والمنتجات مطلوبة" },
        { status: 400 }
      );
    }

    // Must be logged in or provide name
    const customerId = (session?.user as any)?.id as string | undefined;
    if (!customerId) {
      return NextResponse.json(
        { error: "يجب تسجيل الدخول أولاً" },
        { status: 401 }
      );
    }

    const totalAmount = (subtotal || 0) + (shippingCost || 0);

    const order = await prisma.order.create({
      data: {
        customerId,
        customerName: name || session?.user?.name || "",
        customerEmail: email || session?.user?.email || "",
        phone,
        city,
        district: district || city,
        street,
        notes: notes || null,
        paymentMethod,
        totalAmount,
        shippingCost: shippingCost || 0,
        status: "PENDING_APPROVAL",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            vendorId: item.vendorId,
            quantity: item.quantity,
            priceAtTime: item.price,
            size: item.size || null,
            color: item.color || null,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: { select: { title: true } },
          },
        },
      },
    });

    return NextResponse.json({ success: true, orderId: order.id, order });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الطلب: " + error.message },
      { status: 500 }
    );
  }
}

// GET — جلب طلبات المستخدم الحالي
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { customerId: (session!.user as any).id as string },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: { select: { title: true, images: true } },
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

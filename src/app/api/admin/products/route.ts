import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET — جلب منتجات بفلتر (للمخزون) أو منتجات معلقة
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "pending" | "all"

    const where: any = type === "pending" ? { status: "PENDING" } : {};

    const products = await prisma.product.findMany({
      where,
      include: {
        vendor: { select: { id: true, storeName: true, location: true, userId: true } },
        category: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST — إضافة منتج جديد من الأدمن مباشرة (يُنشر فوراً APPROVED)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, price, stock, images, categoryId, vendorId, sizes, colors, action, id, brand, range } = body;

    // لو عندنا action (موافقة/رفض)
    if (action && id) {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          ...(body.price !== undefined && { price: parseFloat(body.price) }),
          ...(body.stock !== undefined && { stock: parseInt(body.stock) }),
        },
      });
      return NextResponse.json(updated);
    }

    // إضافة منتج جديد
    if (!title || !price || !vendorId) {
      return NextResponse.json({ error: "الاسم والسعر والمتجر مطلوبون" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description: description || "",
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        images: Array.isArray(images) ? images.join(",") : images || "",
        sizes: Array.isArray(sizes) ? sizes.join(",") : sizes || "",
        colors: Array.isArray(colors) ? colors.join(",") : colors || "",
        vendorId,
        categoryId: categoryId || null,
        brand: brand || "",
        range: range || "",
        type: body.type || "SIMPLE",
        sku: body.sku || "",
        shortDescription: body.shortDescription || "",
        weight: body.weight ? parseFloat(body.weight) : null,
        length: body.length ? parseFloat(body.length) : null,
        width: body.width ? parseFloat(body.width) : null,
        height: body.height ? parseFloat(body.height) : null,
        ram: body.ram || "",
        storage: body.storage || "",
        screenSize: body.screenSize || "",
        bundleData: body.bundleData || "",
        status: "APPROVED", // الأدمن يضيف مباشرة بدون مراجعة
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Admin Product POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH — تعديل بيانات منتج موجود
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { id, title, description, price, stock, images, categoryId, vendorId, status, brand, range, type, sku, shortDescription, weight, length, width, height, ram, storage, screenSize, bundleData } = body;

    if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(images !== undefined && { images: Array.isArray(images) ? images.join(",") : images }),
        ...(categoryId !== undefined && { categoryId }),
        ...(vendorId && { vendorId }),
        ...(status && { status }),
        ...(brand !== undefined && { brand }),
        ...(range !== undefined && { range }),
        ...(type !== undefined && { type }),
        ...(sku !== undefined && { sku }),
        ...(shortDescription !== undefined && { shortDescription }),
        ...(weight !== undefined && { weight: parseFloat(weight) || null }),
        ...(length !== undefined && { length: parseFloat(length) || null }),
        ...(width !== undefined && { width: parseFloat(width) || null }),
        ...(height !== undefined && { height: parseFloat(height) || null }),
        ...(ram !== undefined && { ram }),
        ...(storage !== undefined && { storage }),
        ...(screenSize !== undefined && { screenSize }),
        ...(bundleData !== undefined && { bundleData }),
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE — حذف منتج
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await req.json();
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

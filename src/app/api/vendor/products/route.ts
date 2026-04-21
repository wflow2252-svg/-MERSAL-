
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor profile not found" }, { status: 404 });
    }

    const products = await prisma.product.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } }
      }
    });

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, description, price, stock, images, categoryId, sizes, colors } = body;

    if (!title || !price) {
      return NextResponse.json({ error: "Title and price are required" }, { status: 400 });
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
        vendorId: vendor.id,
        categoryId: categoryId || null,
        status: "PENDING" // Manual approval required
      }
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Product Creation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

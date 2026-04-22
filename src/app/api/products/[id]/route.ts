import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        vendor: {
          select: { 
            storeName: true, 
            location: true,
            userId: true
          }
        },
        category: {
          select: { 
            id: true, 
            name: true 
          }
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Map to the interface expected by the UI (similar to Mock Product)
    const mappedProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      stock: product.stock,
      image: product.images ? product.images.split(",")[0] : "",
      images: product.images ? product.images.split(",") : [],
      category: product.category?.name || "غير مصنف",
      categoryId: product.categoryId || "others",
      vendor: product.vendor.storeName,
      vendorLocation: product.vendor.location || "السودان",
      vendorId: product.vendorId,
      rating: 4.5, // Default for now
      reviews: 12, // Default for now
      specs: {}, // Can be expanded if stored in JSON
      colors: product.colors ? product.colors.split(",").map(c => ({ name: c, hex: "#ccc" })) : [],
      sizes: product.sizes ? product.sizes.split(",") : [],
    };

    return NextResponse.json(mappedProduct);
  } catch (error) {
    console.error("Fetch Product Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

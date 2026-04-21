
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

    // Fetch orders that have items belonging to this vendor
    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: { vendorId: vendor.id }
        }
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          where: { vendorId: vendor.id },
          include: {
            product: { select: { title: true, images: true } }
          }
        }
      }
    });

    // Map to a more vendor-friendly format
    const vendorOrders = orders.map(order => ({
      id: order.id,
      customerName: order.customerName,
      phone: order.phone,
      city: order.city,
      status: order.status,
      createdAt: order.createdAt,
      totalAmount: order.totalAmount, // Note: This is the total order amount, maybe vendor just wants their portion?
      vendorItems: order.items.map(item => ({
        id: item.id,
        productTitle: item.product.title,
        quantity: item.quantity,
        priceAtTime: item.priceAtTime,
        image: item.product.images?.split(",")[0]
      }))
    }));

    return NextResponse.json(vendorOrders);
  } catch (error: any) {
    console.error("Vendor Orders API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

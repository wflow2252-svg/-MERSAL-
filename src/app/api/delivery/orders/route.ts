import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const driverId = searchParams.get("driverId");

    if (!driverId) {
      return NextResponse.json({ error: "driverId مطلوب" }, { status: 400 });
    }

    // Verify driver exists
    const driver = await prisma.deliveryDriver.findUnique({ where: { id: driverId } });
    if (!driver) {
      return NextResponse.json({ error: "المندوب غير مسجل" }, { status: 404 });
    }

    const orders = await prisma.order.findMany({
      where: { 
        driverId,
        status: { in: ["SHIPPED", "DELAYED", "PACKING"] } // عرض الطلبات قيد التوصيل أو التجهيز
      },
      orderBy: { updatedAt: "desc" },
      include: {
        items: {
          include: {
            product: { select: { title: true } }
          }
        }
      }
    });

    return NextResponse.json({ driver, orders });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch delivery orders" }, { status: 500 });
  }
}

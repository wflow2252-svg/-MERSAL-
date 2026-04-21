import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH — تحديث موقع المندوب
export async function PATCH(req: Request) {
  const { orderId, lat, lng } = await req.json();
  if (!orderId || lat === undefined || lng === undefined) {
    return NextResponse.json({ error: "بيانات الموقع ناقصة" }, { status: 400 });
  }
  await prisma.order.update({
    where: { id: orderId },
    data: { trackingLat: lat, trackingLng: lng },
  });
  return NextResponse.json({ success: true });
}

// GET — جلب موقع المندوب الحالي
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  if (!orderId) return NextResponse.json({ error: "orderId مطلوب" }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true, status: true,
      trackingLat: true, trackingLng: true, trackingNumber: true,
      city: true, district: true, street: true,
      customerName: true, phone: true,
    },
  });
  return NextResponse.json(order);
}

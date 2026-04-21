/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH — تحديث موقع المندوب GPS
export async function PATCH(req: Request) {
  try {
    const { orderId, lat, lng } = await req.json();

    if (!orderId || lat === undefined || lng === undefined) {
      return NextResponse.json(
        { error: "بيانات الموقع ناقصة — orderId و lat و lng مطلوبة" },
        { status: 400 }
      );
    }

    const order = await (prisma.order as any).update({
      where: { id: orderId },
      data: {
        trackingLat: Number(lat),
        trackingLng: Number(lng),
      },
      select: {
        id: true,
        status: true,
        trackingLat: true,
        trackingLng: true,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Tracking PATCH error:", error);
    return NextResponse.json(
      { error: "فشل تحديث الموقع: " + error.message },
      { status: 500 }
    );
  }
}

// GET — جلب موقع المندوب الحالي وبيانات الطلب
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId مطلوب" },
        { status: 400 }
      );
    }

    const order = await (prisma.order as any).findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        trackingLat: true,
        trackingLng: true,
        trackingNumber: true,
        city: true,
        district: true,
        street: true,
        customerName: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "الطلب غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Tracking GET error:", error);
    return NextResponse.json(
      { error: "فشل جلب بيانات التتبع: " + error.message },
      { status: 500 }
    );
  }
}

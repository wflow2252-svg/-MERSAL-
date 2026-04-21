import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const drivers = await prisma.deliveryDriver.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { orders: { where: { status: "SHIPPED" } } }
        }
      }
    });

    return NextResponse.json(drivers);
  } catch (error: any) {
    console.error("GET Drivers Error:", error);
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, vehicleType } = body;

    if (!name || !phone || !vehicleType) {
      return NextResponse.json({ error: "البيانات غير مكتملة" }, { status: 400 });
    }

    const driver = await prisma.deliveryDriver.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        vehicleType: vehicleType.trim(),
        isActive: true,
      }
    });

    return NextResponse.json(driver);
  } catch (error: any) {
    console.error("POST Driver Error:", error);
    return NextResponse.json({ error: "Failed to create driver: " + error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID Required" }, { status: 400 });

    await prisma.deliveryDriver.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

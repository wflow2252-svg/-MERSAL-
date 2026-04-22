import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const zones = await prisma.deliveryZone.findMany({ orderBy: { fromCity: "asc" } });
  return NextResponse.json(zones);
}

export async function POST(req: Request) {
  const { fromCity, toCity, fee } = await req.json();
  if (!fromCity || !toCity || fee === undefined) {
    return NextResponse.json({ error: "مدينة الانطلاق والوصول والرسوم مطلوبة" }, { status: 400 });
  }
  const zone = await prisma.deliveryZone.create({ data: { fromCity, toCity, fee: Number(fee) } });
  return NextResponse.json(zone);
}

export async function PATCH(req: Request) {
  const { id, fromCity, toCity, fee, isActive } = await req.json();
  const zone = await prisma.deliveryZone.update({
    where: { id },
    data: {
      ...(fromCity && { fromCity }),
      ...(toCity && { toCity }),
      ...(fee !== undefined && { fee: Number(fee) }),
      ...(isActive !== undefined && { isActive }),
    },
  });
  return NextResponse.json(zone);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.deliveryZone.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const zones = await prisma.deliveryZone.findMany({ orderBy: { city: "asc" } });
  return NextResponse.json(zones);
}

export async function POST(req: Request) {
  const { name, city, fee } = await req.json();
  if (!name || !city || fee === undefined) {
    return NextResponse.json({ error: "الاسم والمدينة والرسوم مطلوبة" }, { status: 400 });
  }
  const zone = await prisma.deliveryZone.create({ data: { name, city, fee: Number(fee) } });
  return NextResponse.json(zone);
}

export async function PATCH(req: Request) {
  const { id, name, city, fee, isActive } = await req.json();
  const zone = await prisma.deliveryZone.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(city && { city }),
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

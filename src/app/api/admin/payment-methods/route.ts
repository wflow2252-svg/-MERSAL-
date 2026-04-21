import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET — مناطق التوصيل + إعدادات الدفع من Settings
export async function GET() {
  const settings = await prisma.settings.findUnique({ where: { id: "global" } });
  return NextResponse.json(settings);
}

// PATCH — تحديث إعدادات الدفع
export async function PATCH(req: Request) {
  const body = await req.json();
  const settings = await prisma.settings.upsert({
    where: { id: "global" },
    update: body,
    create: { id: "global", ...body },
  });
  return NextResponse.json(settings);
}

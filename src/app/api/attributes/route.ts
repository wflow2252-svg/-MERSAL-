import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const attributes = await prisma.attribute.findMany({
      include: { options: true },
      orderBy: { name: "asc" }
    });

    return NextResponse.json(attributes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

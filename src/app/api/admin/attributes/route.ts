import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const attributes = await prisma.attribute.findMany({
    include: { options: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(attributes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, options } = await req.json();

  if (!name || !options || !Array.isArray(options)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const attribute = await prisma.attribute.create({
      data: {
        name,
        options: {
          create: options.map((opt: string) => ({ value: opt }))
        }
      },
      include: { options: true }
    });

    return NextResponse.json(attribute);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "هذا المتغير موجود مسبقاً" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  await prisma.attribute.delete({
    where: { id }
  });

  return NextResponse.json({ success: true });
}

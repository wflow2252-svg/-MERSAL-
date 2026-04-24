import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vendor = await prisma.vendor.findUnique({ where: { userId } });
  if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

  const reviews = await prisma.review.findMany({
    where: { product: { vendorId: vendor.id } },
    include: {
      user: { select: { name: true, image: true } },
      product: { select: { title: true, images: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(reviews);
}

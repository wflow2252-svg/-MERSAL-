import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const vendors = await prisma.vendor.findMany({
      include: {
        user: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(vendors.map((v: any) => ({
      id: v.id,
      name: v.storeName,
      owner: v.user?.name || "بدون اسم",
      sales: 0, // In a real app, calculate from OrderItems
      rating: "5.0",
      status: v.status === 'APPROVED' ? 'نشط' : (v.status === 'PENDING' ? 'قيد المراجعة' : 'موقف'),
      productsCount: v._count.products
    })));

  } catch (error) {
    console.error("Fetch Vendors Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

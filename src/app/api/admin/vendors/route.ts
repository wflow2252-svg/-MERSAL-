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
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { storeName, ownerName, ownerEmail, ownerPassword, phone, location } = body;

    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.default.hash(ownerPassword, 12);

    const vendor = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          email: ownerEmail,
          name: ownerName,
          password: hashedPassword,
          role: "VENDOR",
          phone: phone,
          isOnboarded: true,
        }
      });

      return await tx.vendor.create({
        data: {
          userId: user.id,
          storeName,
          location: location || "الخرطوم",
          status: "APPROVED",
          phone: phone,
        }
      });
    });

    return NextResponse.json(vendor);
  } catch (error: any) {
    console.error("Admin Create Vendor Error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "البريد الإلكتروني مستخدم بالفعل" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

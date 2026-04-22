import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session as any)?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      storeName, 
      storeCity, 
      bankStatementUrl, 
      commercialRegUrl 
    } = body;

    // 1. Find the existing user
    const user = await prisma.user.findUnique({
      where: { email: (session as any).user.email },
      include: { vendorProfile: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Prevent duplicate vendor registration
    if (user.vendorProfile) {
      return NextResponse.json({ 
        error: "أنت مسجل كبائع بالفعل. يرجى التوجه للوحة التحكم." 
      }, { status: 400 });
    }

    // 3. Create Vendor Profile and update User Role
    const vendor = await prisma.$transaction(async (tx: any) => {
      // Update User
      await tx.user.update({
        where: { id: user.id },
        data: { 
          role: "VENDOR",
          phone: phone || user.phone,
          name: name || user.name
        },
      });

      // Create Vendor
      const slug = storeName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-ء-ي0-9]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return await tx.vendor.create({
        data: {
          userId: user.id,
          storeName,
          slug: `${slug}-${Math.random().toString(36).substring(2, 7)}`,
          location: storeCity,
          bankStatementUrl: bankStatementUrl || "pending",
          commercialRegUrl: commercialRegUrl || null,
          status: "PENDING",
          commissionRate: 10.0,
        },
      });
    });

    return NextResponse.json({ success: true, vendor });
  } catch (error: any) {
    console.error("Vendor registration error details:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta
    });

    if (error?.code === "P2002") {
      return NextResponse.json({ 
        error: "بيانات المتجر مستخدمة بالفعل. حاول اسم متجر آخر." 
      }, { status: 400 });
    }

    return NextResponse.json({ error: "خطأ في معالجة طلب التسجيل" }, { status: 500 });
  }
}

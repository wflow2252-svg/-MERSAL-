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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Create Vendor Profile and update User Role
    const vendor = await prisma.$transaction(async (tx) => {
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
      return await tx.vendor.create({
        data: {
          userId: user.id,
          storeName,
          location: storeCity,
          bankStatementUrl: bankStatementUrl || "pending",
          commercialRegUrl: commercialRegUrl || null,
          status: "PENDING",
          commissionRate: 10.0,
        },
      });
    });

    return NextResponse.json({ success: true, vendor });
  } catch (error) {
    console.error("Vendor registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

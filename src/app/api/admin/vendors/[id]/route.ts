import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;
    const data = await req.json();

    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: {
        status: data.status,
        commissionType: data.commissionType,
        commissionRate: data.commissionRate,
        fixedFee: data.fixedFee,
        subscriptionFee: data.subscriptionFee,
      }
    });

    return NextResponse.json(updatedVendor);
  } catch (error) {
    console.error("Vendor Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

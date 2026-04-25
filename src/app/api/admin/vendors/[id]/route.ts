import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const data = await req.json();

    const updatedVendor = await prisma.$transaction(async (tx) => {
      const v = await tx.vendor.update({
        where: { id },
        data: {
          status: data.status,
          commissionType: data.commissionType,
          commissionRate: data.commissionRate,
          fixedFee: data.fixedFee,
          subscriptionFee: data.subscriptionFee,
          subscriptionEndsAt: data.status === 'APPROVED' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined,
        }
      });

      if (data.status === 'APPROVED') {
        await tx.user.update({
          where: { id: v.userId },
          data: { role: 'VENDOR' }
        });
      }

      return v;
    });

    return NextResponse.json(updatedVendor);
  } catch (error) {
    console.error("Vendor Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

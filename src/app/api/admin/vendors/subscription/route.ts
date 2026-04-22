import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { vendorId, planId, action } = await req.json();

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId }
    });

    if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

    if (action === "assign_plan") {
      const plan = await prisma.subscriptionPlan.findUnique({ where: { id: planId } });
      if (!plan) return NextResponse.json({ error: "Plan not found" }, { status: 404 });

      const newEndsAt = new Date();
      newEndsAt.setDate(newEndsAt.getDate() + plan.durationDays);

      await prisma.vendor.update({
        where: { id: vendorId },
        data: {
          planId: plan.id,
          subscriptionEndsAt: newEndsAt,
          isTrialUsed: plan.isTrial ? true : vendor.isTrialUsed
        }
      });
    } else if (action === "cancel") {
      await prisma.vendor.update({
        where: { id: vendorId },
        data: {
          subscriptionEndsAt: new Date(), // End it now
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vendor Subscription Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET all withdrawals
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const withdrawals = await prisma.withdrawal.findMany({
      include: {
        vendor: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(withdrawals.map(w => ({
      id: w.id,
      vendor: w.vendor.storeName,
      amount: w.amount,
      status: w.status,
      date: new Date(w.createdAt).toLocaleString('ar-EG'),
      method: "بنك الخرطوم" // Default for now
    })));

  } catch (error) {
    console.error("Fetch Withdrawals Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH update withdrawal status
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, status } = await req.json();

    const updated = await prisma.withdrawal.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updated);

  } catch (error) {
    console.error("Update Withdrawal Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

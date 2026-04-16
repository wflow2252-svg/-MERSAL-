import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 1. Authorization Guard
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 403 });
    }

    // 2. Aggregate Real Data
    const [totalVendors, totalSales, pendingRequests, pendingVendorsList, settings] = await Promise.all([
      prisma.vendor.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.vendor.count({ where: { status: 'PENDING' } }),
      prisma.vendor.findMany({ 
        where: { status: 'PENDING' }, 
        include: { user: true },
        take: 5 
      }),
      prisma.settings.findUnique({ where: { id: 'global' } })
    ]);

    return NextResponse.json({
      stats: [
        { label: "إجمالي الموردين", value: totalVendors.toString(), icon: "groups", color: "bg-gradient-to-br from-purple-600 to-purple-800" },
        { label: "مبيعات المنصة", value: `${(totalSales._sum.totalAmount || 0).toLocaleString()} ج.س`, icon: "payments", color: "bg-gradient-to-br from-[#1089A4] to-[#086F85]" },
        { label: "طلبات معلقة", value: pendingRequests.toString(), icon: "pending_actions", color: "bg-gradient-to-br from-[#F29124] to-[#D47B1E]" },
      ],
      pendingVendors: pendingVendorsList.map(v => ({
        id: v.id,
        name: v.user?.name || "بدون اسم",
        store: v.storeName,
        city: v.location,
        docs: v.bankStatementUrl
      })),
      exchangeRate: settings?.exchangeRate || 600
    });

  } catch (error) {
    console.error("Admin Stats Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

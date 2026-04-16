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

    const settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });

    return NextResponse.json({ settings, admins });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();

    const updatedSettings = await prisma.settings.upsert({
      where: { id: 'global' },
      update: {
        maintenanceMode: data.maintenanceMode,
        maintenanceMessage: data.maintenanceMessage,
        platformCommission: data.platformCommission,
        exchangeRate: data.exchangeRate,
      },
      create: {
        id: 'global',
        maintenanceMode: data.maintenanceMode || false,
        maintenanceMessage: data.maintenanceMessage || "هناك خطأ تقني يجري إصلاحه",
        platformCommission: data.platformCommission || 10.0,
        exchangeRate: data.exchangeRate || 1.0,
      }
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// For adding new admins
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.email || (session as any).user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { email, role } = await req.json();
    
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: role || 'ADMIN' }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

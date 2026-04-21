import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET — جلب قائمة الموظفين
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const employees = await prisma.employee.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(employees);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST — إضافة موظف جديد ومزامنة الدور مع جدول المستخدمين
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, role } = await req.json();
    if (!name || !email || !role) {
      return NextResponse.json({ error: "الاسم والبريد والدور مطلوبة" }, { status: 400 });
    }

    // 1. إنشاء الموظف في جدول الموظفين
    const employee = await prisma.employee.create({ data: { name, email: email.toLowerCase(), role } });

    // 2. مزامنة الدور مع جدول المستخدمين إذا كان الحساب موجوداً
    await prisma.user.updateMany({
      where: { email: email.toLowerCase() },
      data: { role: role }
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH — تحديث بيانات الموظف
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, role, isActive } = await req.json();
    const oldEmployee = await prisma.employee.findUnique({ where: { id } });
    
    const employee = await prisma.employee.update({
      where: { id },
      data: { ...(name && { name }), ...(role && { role }), ...(isActive !== undefined && { isActive }) },
    });

    // مزامنة الدور الجديد مع جدول المستخدمين
    if (role && employee.email) {
      await prisma.user.updateMany({
        where: { email: employee.email },
        data: { role: role }
      });
    }

    return NextResponse.json(employee);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE — حذف الموظف وإعادة رتبة المستخدم إلى CUSTOMER
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const employee = await prisma.employee.findUnique({ where: { id } });
    
    if (employee) {
      // إعادة المستخدم لرتبة عميل عادي عند حذفه من الموظفين
      await prisma.user.updateMany({
        where: { email: employee.email },
        data: { role: "CUSTOMER" }
      });
      
      await prisma.employee.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

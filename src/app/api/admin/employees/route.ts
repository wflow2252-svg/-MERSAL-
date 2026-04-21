import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const employees = await prisma.employee.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  const { name, email, role } = await req.json();
  if (!name || !email || !role) {
    return NextResponse.json({ error: "الاسم والبريد والدور مطلوبة" }, { status: 400 });
  }
  const employee = await prisma.employee.create({ data: { name, email, role } });
  return NextResponse.json(employee);
}

export async function PATCH(req: Request) {
  const { id, name, role, isActive } = await req.json();
  const employee = await prisma.employee.update({
    where: { id },
    data: { ...(name && { name }), ...(role && { role }), ...(isActive !== undefined && { isActive }) },
  });
  return NextResponse.json(employee);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.employee.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET — جلب إعدادات شركة الشحن النشطة
export async function GET() {
  const provider = await prisma.shippingProvider.findFirst({ where: { isActive: true } });
  const allProviders = await prisma.shippingProvider.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ active: provider, all: allProviders });
}

// POST — إضافة شركة شحن جديدة
export async function POST(req: Request) {
  const { name, apiKey, baseUrl } = await req.json();
  if (!name || !apiKey || !baseUrl) {
    return NextResponse.json({ error: "الاسم والـ API Key والرابط مطلوبة" }, { status: 400 });
  }
  // إلغاء تفعيل الكل ثم تفعيل الجديد
  await prisma.shippingProvider.updateMany({ data: { isActive: false } });
  const provider = await prisma.shippingProvider.create({
    data: { name, apiKey, baseUrl, isActive: true },
  });
  return NextResponse.json(provider);
}

// PATCH — تعديل أو تبديل شركة الشحن
export async function PATCH(req: Request) {
  const { id, name, apiKey, baseUrl, isActive } = await req.json();
  if (isActive) {
    await prisma.shippingProvider.updateMany({ data: { isActive: false } });
  }
  const provider = await prisma.shippingProvider.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(apiKey && { apiKey }),
      ...(baseUrl && { baseUrl }),
      ...(isActive !== undefined && { isActive }),
    },
  });
  return NextResponse.json(provider);
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.shippingProvider.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

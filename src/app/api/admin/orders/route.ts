import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET — جلب كل الطلبات مع فلترة الحالة
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") where.status = status;
  if (search) {
    where.OR = [
      { customerName: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
      { id: { contains: search } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      items: {
        include: {
          product: { select: { title: true, images: true } },
          vendor: { select: { storeName: true } },
        },
      },
    },
  });

  return NextResponse.json(orders);
}

// PATCH — تغيير حالة طلب
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, status, trackingNumber } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "id و status مطلوبان" }, { status: 400 });
  }

  const updated = await prisma.order.update({
    where: { id },
    data: {
      status,
      ...(trackingNumber && { trackingNumber }),
      updatedAt: new Date(),
    },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      items: {
        include: {
          product: { select: { title: true, images: true } },
        },
      },
    },
  });

  // لو الطلب اتأكد → نحاول نبعت لشركة الشحن تلقائياً
  if (status === "APPROVED") {
    try {
      const provider = await prisma.shippingProvider.findFirst({ where: { isActive: true } });
      if (provider) {
        await fetch(provider.baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${provider.apiKey}`,
          },
          body: JSON.stringify({
            orderId: updated.id,
            customerName: updated.customerName || updated.customer?.name,
            customerPhone: updated.phone,
            customerEmail: updated.customerEmail || updated.customer?.email,
            city: updated.city,
            district: updated.district,
            street: updated.street,
            items: updated.items.map(i => ({
              name: i.product.title,
              qty: i.quantity,
              price: i.priceAtTime,
            })),
            totalAmount: updated.totalAmount,
            paymentMethod: updated.paymentMethod,
          }),
        }).then(async (r) => {
          if (r.ok) {
            const data = await r.json();
            if (data.trackingNumber) {
              await prisma.order.update({
                where: { id },
                data: { trackingNumber: data.trackingNumber },
              });
            }
          }
        }).catch(() => {}); // الفشل لا يوقف العملية
      }
    } catch {}
  }

  return NextResponse.json(updated);
}

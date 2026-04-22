import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") || "new";

  try {
    let orderBy: any = { createdAt: "desc" };
    if (sort === "best") {
      orderBy = { purchaseCount: "desc" };
    }

    const products = await prisma.product.findMany({
      where: { status: "APPROVED" },
      include: {
        vendor: {
          select: { storeName: true, location: true }
        }
      },
      orderBy,
      take: 20
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

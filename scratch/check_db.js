const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- DB Check Started ---');
  const products = await prisma.product.findMany({
    include: { vendor: true }
  });
  console.log('Total Products:', products.length);
  console.log('Statuses:', products.map(p => p.status));
  console.log('Vendor Subscriptions:', products.map(p => p.vendor?.subscriptionEndsAt));
  
  const vendors = await prisma.vendor.findMany();
  console.log('Total Vendors:', vendors.length);
  console.log('Vendor Statuses:', vendors.map(v => v.status));
}

main().catch(console.error).finally(() => prisma.$disconnect());

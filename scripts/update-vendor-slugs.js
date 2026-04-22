const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const vendors = await prisma.vendor.findMany({
    where: {
      OR: [
        { slug: null },
        { subscriptionEndsAt: null }
      ]
    }
  });

  console.log(`Found ${vendors.length} vendors to update.`);

  for (const vendor of vendors) {
    const slugBase = vendor.storeName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-ء-ي0-9]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const slug = vendor.slug || `${slugBase}-${randomSuffix}`;
    
    // Give 30 days trial if null
    const subscriptionEndsAt = vendor.subscriptionEndsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.vendor.update({
      where: { id: vendor.id },
      data: { 
        slug,
        subscriptionEndsAt
      }
    });
    
    console.log(`Updated vendor: ${vendor.storeName} -> ${slug}`);
  }

  console.log("Update complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

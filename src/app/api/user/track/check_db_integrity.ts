import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const usersCount = await prisma.user.count();
  console.log("Total Users in DB:", usersCount);
  
  const sampleUsers = await prisma.user.findMany({ take: 5 });
  console.log("Sample Users:", JSON.stringify(sampleUsers.map(u => u.email), null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const emails = ["Wdbadawi7@gmail.com", "wd.badawi7@gmail.com"];
  
  for (const email of emails) {
    try {
      const updated = await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' }
      });
      console.log(`Success: Role updated for ${email}`);
    } catch (e) {
      console.error(`Error updating ${email}:`, e);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())

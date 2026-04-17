import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const email = "blackhatsd.sd@gmail.com"
  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: "blackhatsd",
        mode: 'insensitive'
      }
    }
  })
  console.log("Users found:", JSON.stringify(users, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())

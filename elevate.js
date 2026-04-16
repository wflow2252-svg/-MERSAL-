const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// TYPE YOUR EMAIL HERE
const ADMIN_EMAIL = "hazem@example.com"; 

async function elevate() {
  console.log(`🚀 Attempting to elevate: ${ADMIN_EMAIL}...`);
  
  try {
    const user = await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: { role: "ADMIN" }
    });
    
    console.log(`✅ SUCCESS! ${user.name} is now a ROOT ADMIN.`);
    console.log(`🔗 You can now access https://morsall.com/admin/dashboard`);
  } catch (error) {
    console.error("❌ ERROR: User not found. Make sure you have logged in with Google at least once first!");
  } finally {
    await prisma.$disconnect();
  }
}

elevate();

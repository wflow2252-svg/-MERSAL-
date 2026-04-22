
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function testRegistration() {
  const testEmail = `test_${Date.now()}@example.com`;
  const password = "password123";
  const name = "Test User";

  console.log(`Testing registration for: ${testEmail}`);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        name,
        password: hashedPassword,
        role: "USER",
        isOnboarded: false,
      },
    });

    console.log("User successfully created:", user);

    const foundUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (foundUser) {
      console.log("Verified: User exists in database.");
    } else {
      console.error("Error: User NOT found in database after creation!");
    }

    // Cleanup
    await prisma.user.delete({ where: { id: user.id } });
    console.log("Cleanup: Test user deleted.");

  } catch (error) {
    console.error("Registration logic failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegistration();

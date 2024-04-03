import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        name: "User One",
        todos: {
          create: [
            {
              content: "This is the content of the first todo",
              done: false,
            },
            {
              content: "This is the content of the second todo",
              done: true,
            },
          ],
        },
      },
    });
    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        name: "User Two",
        todos: {
          create: [
            {
              content: "This is the content of the third todo",
              done: false,
            },
          ],
        },
      },
    });

    console.log("Seed data created successfully");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

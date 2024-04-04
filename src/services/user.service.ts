import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserService = {
  getAllUsers: async () => {
    return prisma.user.findMany({ include: { todos: true } });
  },

  getUserById: async (userId: any) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },
    });
  },

  createUser: async (email: any, name: any) => {
    return prisma.user.create({ data: { email, name } });
  },

  updateUser: async (userId: any, email: any, name: any) => {
    return prisma.user.update({ where: { id: userId }, data: { email, name } });
  },

  deleteUser: async (userId: any) => {
    return prisma.user.delete({ where: { id: userId } });
  },

  checkUserExists: async (email: any) => {
    return prisma.user.findUnique({ where: { email } });
  },
};

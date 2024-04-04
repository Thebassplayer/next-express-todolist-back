import { PrismaClient } from "@prisma/client";
import { UserId } from "../types";

const prisma = new PrismaClient();

export const UserService = {
  getAllUsers: async () => {
    return prisma.user.findMany({ include: { todos: true } });
  },

  getUserById: async (userId: UserId) => {
    return prisma.user.findUnique({
      where: { id: +userId },
      include: { todos: true },
    });
  },

  createUser: async (email: string, name: string) => {
    return prisma.user.create({ data: { email, name } });
  },

  updateUser: async (userId: UserId, email: string, name: string) => {
    return prisma.user.update({
      where: { id: +userId },
      data: { email, name },
    });
  },

  deleteUser: async (userId: UserId) => {
    return prisma.user.delete({ where: { id: +userId } });
  },

  checkUserExists: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
};

import { PrismaClient } from "@prisma/client";
import { User, Todo } from "@prisma/client";

export type TodoId = Pick<Todo, "id">;
type UserId = Pick<User, "id">;
type CreateTodo = Pick<Todo, "content" | "authorId">;
type UpdateTodo = Pick<Todo, "content" | "done" | "authorId" | "id">;

const prisma = new PrismaClient();

export const TodoService = {
  getAllTodos: async () => {
    return prisma.todo.findMany({ include: { author: true } });
  },

  getTodoById: async ({ id }: TodoId) => {
    return prisma.todo.findUnique({
      where: { id },
      include: { author: true },
    });
  },

  createTodo: async (todoData: CreateTodo) => {
    const { content, authorId } = todoData;
    const id = +authorId;
    return prisma.todo.create({
      data: { content, authorId: id },
    });
  },

  updateTodo: async (todoData: UpdateTodo) => {
    const { content, done, authorId, id } = todoData;
    return prisma.todo.update({
      where: { id },
      data: { content, done, authorId },
    });
  },

  deleteTodo: async (todoId: number) => {
    return prisma.todo.delete({ where: { id: +todoId } });
  },

  deleteAllTodos: async () => {
    return prisma.todo.deleteMany();
  },
};

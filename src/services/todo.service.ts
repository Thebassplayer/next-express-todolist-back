import { PrismaClient } from "@prisma/client";
import { User, Todo } from "@prisma/client";

export type TodoId = Pick<Todo, "id">;
type Email = Pick<User, "email">;
type UserId = Pick<User, "id">;
type Content = Pick<Todo, "content">;
type CreateTodo = Content & Email;
type UpdateTodo = Pick<Todo, "content" | "done" | "authorId" | "id"> & Email;
type GetTodoById = TodoId & Email;
type DeleteTodo = TodoId & Email;

const prisma = new PrismaClient();

export const TodoService = {
  getAllTodos: async ({ email }: Email) => {
    return prisma.todo.findMany({
      where: { author: { email } },
      include: { author: true },
    });
  },

  getTodoById: async ({ email, id }: GetTodoById) => {
    return prisma.todo.findFirst({
      where: { id, author: { email } },
      include: { author: true },
    });
  },

  createTodo: async ({ content, email }: CreateTodo) => {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // If user does not exist, create the user
      user = await prisma.user.create({ data: { email } });
    }

    return prisma.todo.create({
      data: { content, authorId: user.id },
    });
  },

  updateTodo: async (todoData: UpdateTodo) => {
    const { content, done, authorId, id } = todoData;
    return prisma.todo.update({
      where: { id },
      data: { content, done, authorId },
    });
  },

  deleteTodo: async ({ email, id }: DeleteTodo) => {
    return prisma.todo.deleteMany({ where: { id, author: { email } } });
  },

  deleteAllTodos: async () => {
    return prisma.todo.deleteMany();
  },
};

import { Todo, User } from "@prisma/client";

type TodoId = Pick<Todo, "id">;
type Email = Pick<User, "email">;
type UserId = Pick<User, "id">;
type Content = Pick<Todo, "content">;
type CreateTodo = Content & Email;
type UpdateTodo = Pick<Todo, "content" | "done" | "authorId" | "id"> & Email;
type GetTodoById = TodoId & Email;
type DeleteTodo = TodoId & Email;

export {
  TodoId,
  Email,
  UserId,
  Content,
  CreateTodo,
  UpdateTodo,
  GetTodoById,
  DeleteTodo,
};

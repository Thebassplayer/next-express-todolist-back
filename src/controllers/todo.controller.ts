import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";
import { RequestWithUser } from "../middlewares/getUserInfo";

export const TodoController = {
  getAllTodos: async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.user.email;
    try {
      const todos = await TodoService.getAllTodos({ email });
      res.json(todos);
    } catch (error) {
      next(error);
    }
  },

  getTodoById: async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todoId = parseInt(req.params.id);
      const email = req.user.email;
      const todo = await TodoService.getTodoById({ email, id: todoId });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      next(error);
    }
  },

  createTodo: async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { content } = req.body;
      const email = req.user.email;
      const newTodo = await TodoService.createTodo({ content, email });
      res.json(newTodo);
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todoId = parseInt(req.params.id);
      const email = req.user.email;

      const todo = await TodoService.getTodoById({ email, id: todoId });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      const { content, done, authorId } = req.body;
      const updatedTodo = await TodoService.updateTodo({
        id: todoId,
        content,
        done,
        authorId,
        email,
      });
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  },

  deleteTodo: async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id);
      const email = req.user.email;
      const todo = await TodoService.getTodoById({ email, id });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      await TodoService.deleteTodo({ email, id });
      return res
        .status(200)
        .send(`Todo with id ${id} has been deleted successfully`);
    } catch (error) {
      next(error);
    }
  },

  deleteAllTodos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoService.deleteAllTodos();

      return res.status(200).send("All todos have been deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};

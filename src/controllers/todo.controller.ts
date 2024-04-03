import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";

export const TodoController = {
  getAllTodos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await TodoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  },

  getTodoById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = parseInt(req.params.id);
      const todo = await TodoService.getTodoById({ id: todoId });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      next(error);
    }
  },

  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, authorId } = req.body;
      const newTodo = await TodoService.createTodo({ content, authorId });
      res.json(newTodo);
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = parseInt(req.params.id);

      const todo = await TodoService.getTodoById({ id: todoId });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      const { content, done, authorId } = req.body;
      const updatedTodo = await TodoService.updateTodo({
        id: todoId,
        content,
        done,
        authorId,
      });
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  },

  deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = parseInt(req.params.id);
      const todo = await TodoService.getTodoById({ id: todoId });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      await TodoService.deleteTodo(todoId);
      return res
        .status(200)
        .send(`Todo with id ${todoId} has been deleted successfully`);
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

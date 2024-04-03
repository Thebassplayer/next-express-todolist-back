import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export const UserController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body;
      const newUser = await UserService.createUser(email, name);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id);
      const { email, name } = req.body;
      const updatedUser = await UserService.updateUser(userId, email, name);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id);
      await UserService.deleteUser(userId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
};

import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();

router.get("/all", TodoController.getAllTodos);

router.get("/:id", TodoController.getTodoById);

router.post("/", TodoController.createTodo);

router.put("/:id", TodoController.updateTodo);

router.delete("/all", TodoController.deleteAllTodos);

router.delete("/:id", TodoController.deleteTodo);

export default router;

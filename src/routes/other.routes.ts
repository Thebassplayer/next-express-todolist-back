// server/src/routes/index.ts

import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  res.status(200).send("Server Running...");
});

router.get("/private-route", async (req, res, next) => {
  res.status(200).send({ message: "This is a private route" });
});

export default router;

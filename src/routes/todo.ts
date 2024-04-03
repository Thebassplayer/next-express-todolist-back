import { Router, Request, Response, NextFunction } from "express";

const router = Router();
/* GET users listing. */
router.get("/all", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

router.delete("/:id", function (req, res, next) {
  res.send("respond with a resource");
});
router.delete("/all", function (req, res, next) {
  res.send("respond with a resource");
});

export default router;

import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const courseRouter = Router();
courseRouter.get("/:id", (req, res) => res.send({ title: "Get course" }));
courseRouter.post("/", (req, res) => res.send({ title: "Create course" }));
courseRouter.put("/:id", (req, res) => res.send({ title: "Update course" }));
courseRouter.delete("/:id", (req, res) => res.send({ title: "Delete course" }));
courseRouter.get("/", authorize, role(["instructor", "admin"]), (req, res) =>
  res.send({ title: "Get all courses" })
); // for admin

export default courseRouter;

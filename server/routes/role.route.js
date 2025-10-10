import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getRole, addInstructorRole } from "../controllers/role.controller.js";
const roleRouter = Router();

roleRouter.get("/", authorize, getRole);
roleRouter.post("/", authorize, addInstructorRole);

export default roleRouter;
import { Router } from "express";
import role from "../middlewares/role.middleware.js";
import authorize from "../middlewares/auth.middleware.js";
import { userDashboard, instructorDashboard } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/user", authorize, userDashboard);

dashboardRouter.get("/instructor", authorize, role(["admin", "instructor"]), instructorDashboard);

export default dashboardRouter;
import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import role from "../middlewares/role.middleware.js";
import { createLessons, getLessonsByCourse, getLessonByLessonId } from "../controllers/lesson.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const lessonsRouter = Router();

// POST: Save new lesson
lessonsRouter.post("/:courseId", authorize, role(["admin", "instructor"]), upload.array("videos", 5), createLessons);

// GET: Fetch all lessons of a course
lessonsRouter.get("/:courseId", authorize, getLessonsByCourse);

// GET: Fetch a particular lesson details 
lessonsRouter.get("/:courseId/:lessonId", authorize, getLessonByLessonId);

export default lessonsRouter;
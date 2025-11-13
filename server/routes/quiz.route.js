import express from "express";
import {
  addQuestion,
  getQuizzesByCourseId
} from "../controllers/quiz.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const quizRouter = express.Router();

// POST: Create a quiz
quizRouter.post(
  "/create-quiz/:courseId",
  authorize,
  role(["admin", "instructor"]),
  addQuestion
);

//GET: Get all the quizzes for a particular course
quizRouter.get("/:courseId", getQuizzesByCourseId);

export default quizRouter;
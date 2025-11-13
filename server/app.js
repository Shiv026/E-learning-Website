import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRouter from "./routes/course.route.js";
import lessonsRouter from "./routes/lessons.route.js";
import quizRouter from "./routes/quiz.route.js";
import enrollmentRouter from "./routes/enrollement.route.js";
import roleRouter from "./routes/role.route.js";
import dashboardRouter from "./routes/dashboard.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users/role", roleRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/lessons", lessonsRouter);
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/enrollments", enrollmentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use(errorMiddleware);

const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();
import { createQuestion } from "../models/quiz.models.js";
import { db } from "../database/db.js";

export const addQuestion = async (req, res) => {
  console.log('Received quiz payload:', req.body);
  console.log('User from auth middleware:', req.user);
  const { courseId } = req.params;

  try {
    const results = await createQuestion(req.body, courseId);
    const affectedRows = results && results.length > 0 ? results[0].affectedRows : 0;

    console.log('Database insertion successful!');
    return res.status(201).json({
      message: "Quiz created successfully!",
      insertedCount: affectedRows,
    });
  } catch (error) {
    console.error('Database insertion error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getQuizzesByCourseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM quiz_questions WHERE course_id = ? ORDER BY quiz_title, id",
      [courseId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this course." });
    }

    // Group by quiz_title
    const grouped = rows.reduce((acc, row) => {
      const { quiz_title, ...question } = row;
      if (!acc[quiz_title]) acc[quiz_title] = [];
      acc[quiz_title].push(question);
      return acc;
    }, {});

    // Convert to array form
    const quizzes = Object.entries(grouped).map(([title, questions]) => ({
      quiz_title: title,
      questions,
    }));

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
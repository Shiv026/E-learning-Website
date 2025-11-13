import { db } from "../database/db.js";

/**
 * Create new lessons after video upload on Cloudinary
 * Returns the inserted lesson details (including lesson_id)
 */
export const createLessons = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const titles = Array.isArray(req.body.title)
      ? req.body.title
      : [req.body.title];
    const descriptions = Array.isArray(req.body.description)
      ? req.body.description
      : [req.body.description];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one video is required" });
    }

    const newLessons = [];

    // Insert each lesson and collect its info
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const videoUrl = file.path;
      const publicId = file.filename;

      // Insert into DB
      const [result] = await db.execute(
        `INSERT INTO lessons (course_id, title, description, video_url, public_id)
         VALUES (?, ?, ?, ?, ?)`,
        [courseId, titles[i], descriptions[i], videoUrl, publicId]
      );
      newLessons.push({
        id: result.insertId, // This is the new lesson_id
        title: titles[i],
        description: descriptions[i]
      });

      // Fetch inserted lesson info
      const [rows] = await db.execute(
        `SELECT lesson_id, course_id, title, description, video_url, public_id, created_at
         FROM lessons WHERE lesson_id = ?`,
        [result.insertId]
      );
    }

    return res.status(201).json({
      message: "Lessons created successfully",
      lessons: newLessons, // Contains all created lessons with IDs
    });
  } catch (error) {
    console.error("Error creating lessons:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Get all lessons for a specific course
 */
export const getLessonsByCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.user_id;
  console.log(userId);
  try {
    const [user] = await db.query(
      "SELECT 1 FROM enrollments WHERE course_id = ? AND user_id = ?",
      [courseId, userId]
    );

    if (user.length === 0) {
      console.log('failed');
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course" });
    }

    const [rows] = await db.query(
      "SELECT lesson_id, title FROM lessons WHERE course_id = ? ORDER BY created_at ASC",
      [courseId]
    );
    console.log(rows);

    res.json(rows);
  } catch (err) {
    console.error("DB Fetch Error:", err);
    res.status(500).json({ message: "Database fetch failed" });
  }
};

/**
 * Get details about a specific lesson
 */
export const getLessonByLessonId = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user.user_id;
  console.log(courseId + " " + lessonId + " " + userId);
  try {
    const [user] = await db.query(
      "SELECT course_id, user_id FROM enrollments WHERE course_id = ? AND user_id = ?",
      [courseId, userId]
    );

    if (user.length === 0) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course" });
    }
    const [result] = await db.query(
      "SELECT lesson_id, title, description, video_url, created_at FROM lessons WHERE lesson_id = ? AND course_id = ?",
      [lessonId, courseId]
    );
    console.log(result);
    if (result.length === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ message: "Success", lesson: result[0] });
  } catch (err) {
    console.error("DB Fetch Error:", err);
    res.status(500).json({ message: "Database fetch failed" });
  }
};
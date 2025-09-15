import cloudinary from "../config/cloudinary.js";
import { db } from "../database/db.js";

// Create a new lesson after video upload
export const createLessons = async (req, res) => {
  try {
    const { courseId } = req.body;
    const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
    const descriptions = Array.isArray(req.body.description) ? req.body.description : [req.body.description];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one video is required" });
    }

    const lessons = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const videoUrl = file.path;
      const publicId = file.filename;

      const details = await cloudinary.api.resource(publicId, { resource_type: "video" });
      const duration = await details.duration;
      console.log({
        courseId,
        title: titles[i],
        description: descriptions[i],
        videoUrl,
        publicId,
        duration,
      });

      const [result] = await db.execute(
        `INSERT INTO lessons (course_id, title, description, video_url, public_id, duration)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [courseId, titles[i], descriptions[i], videoUrl, publicId, duration || 0]
      );
      lessons.push({
        id: result.insertId,
        courseId,
        title: titles[i],
        description: descriptions[i],
        videoUrl,
        publicId,
        duration,
      });
    }
    res.status(201).json({
      message: "Lessons created sucessfully",
      lessons,
    });

  } catch (error) {
    console.log("Error creating lessons: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all lessons for a specific course
export const getLessonsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM lessons WHERE course_id = ? ORDER BY created_at ASC",
      [courseId]
    );

    res.json(rows);
  } catch (err) {
    console.error("DB Fetch Error:", err);
    res.status(500).json({ message: "Database fetch failed" });
  }
};
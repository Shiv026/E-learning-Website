import { db } from "../database/db.js";

export const userDashboard = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;

    // Get all courses the user is enrolled in, with enrolled date, instructor name, and price
    const [courses] = await db.query(
      `SELECT 
        c.course_id,
        c.title,
        c.price,
        c.created_by,
        u.name AS instructor_name,
        e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.course_id
      JOIN users u ON c.created_by = u.user_id
      WHERE e.user_id = ?
      ORDER BY e.enrolled_at DESC`,
      [user_id]
    );

    return res.status(200).json({
      message: "Enrolled courses fetched successfully",
      result: courses
    });
  } catch (error) {
    next(error);
  }
};

export const instructorDashboard = async (req, res, next) => {
  try {
    const instructor_id = req.user.user_id;

    // Get all courses created by the instructor, with student count and revenue
    const [courses] = await db.query(
      `SELECT 
        c.course_id,
        c.title,
        c.price,
        c.created_at,
        COUNT(e.user_id) AS total_students,
        (COUNT(e.user_id) * c.price) AS revenue
      FROM courses c
      LEFT JOIN enrollments e ON c.course_id = e.course_id
      WHERE c.created_by = ?
      GROUP BY c.course_id, c.title, c.price, c.created_at
      ORDER BY c.created_at DESC`,
      [instructor_id]
    );

    return res.status(200).json({
      message: "Instructor courses fetched successfully",
      result: courses
    });
  } catch (error) {
    next(error);
  }
};
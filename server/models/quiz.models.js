import { db } from "../database/db.js"

export const createQuestion = async (question, courseId) => {
  const questionsArray = Array.isArray(question) ? question : [question];

  const sql = `
    INSERT INTO quiz_questions 
    (quiz_title, question_text, option_a, option_b, option_c, option_d, correct_option, course_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const results = [];

  for (const q of questionsArray) {
    const courseIdAsInt = parseInt(courseId || q.course_id, 10);
    const values = [
      q.quiz_title,
      q.question_text,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_option,
      courseIdAsInt
    ];

    const [result] = await db.execute(sql, values);
    results.push(result);
  }

  return results;
};
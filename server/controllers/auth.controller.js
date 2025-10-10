import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { db } from "../database/db.js";
import validateEmail from "../utils/validateEmail.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lowerCaseEmail = email.toLowerCase();

    // Email format validation
    if (!validateEmail(lowerCaseEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [lowerCaseEmail]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, lowerCaseEmail, hashedPassword]
    );

    const userId = result.insertId;

    // Get student role ID
    const [roleResult] = await db.query(
      "SELECT role_id FROM roles WHERE role_name = ?",
      ["student"]
    );
    const roleId = roleResult[0].role_id;

    // Assign student role
    const [userRole] = await db.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
      [userId, roleId]
    );

    if (userRole.affectedRows !== 1) {
      return res.status(500).json({ message: "Failed to assign user role" });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    // Email format validation
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // lowercase the email
    const lowerCaseEmail = email.toLowerCase();

    // check if user exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [lowerCaseEmail]
    );
    if (existingUser.length === 0)
      return res.status(404).json({ message: "User does not exist" });

    const user = existingUser[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const userData = {
      userId: user.user_id,
      email: user.email,
      name: user.name
    }
    return res
      .status(200)
      .json({ success: true, message: "User signed-in", token, userData });
  } catch (err) {
    next(err);
  }
};
export const signOut = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  return res.status(200).json({
    message:
      "Signed out successfully. Please delete the token on the client side.",
  });
};
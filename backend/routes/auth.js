const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../db");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
};

const getJwtExpiry = () => process.env.JWT_EXPIRES_IN || "7d";

const buildAuthResponse = (user, token) => ({
  success: true,
  data: {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  },
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and password are required",
    });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      getJwtSecret(),
      {
        expiresIn: getJwtExpiry(),
      }
    );

    return res.status(201).json(buildAuthResponse(user, token));
  } catch (error) {
    if (
      error.message === "JWT_SECRET is not defined in environment variables"
    ) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, error: "Server configuration error" });
    }

    console.error("Signup error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create account" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password are required" });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      getJwtSecret(),
      {
        expiresIn: getJwtExpiry(),
      }
    );

    return res.json(buildAuthResponse(user, token));
  } catch (error) {
    if (
      error.message === "JWT_SECRET is not defined in environment variables"
    ) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, error: "Server configuration error" });
    }

    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to sign in" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.user.id).select("name email role");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Fetch current user error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user" });
  }
});

module.exports = router;

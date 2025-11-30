const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Authorization token missing" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not configured");
    return res
      .status(500)
      .json({ success: false, error: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role || "user",
    };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;

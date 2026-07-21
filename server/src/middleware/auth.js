import jwt from "jsonwebtoken";

/**
 * protect
 * ---------------------------------------------------------------------------
 * Middleware that verifies the JWT token sent in the Authorization header.
 * All admin API routes use this — public portfolio routes do NOT.
 *
 * Expected header format:
 *   Authorization: Bearer <token>
 *
 * The token is issued by POST /api/auth/login and stored in the admin
 * panel's localStorage. It expires based on JWT_EXPIRES_IN in .env.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized — no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized — token invalid or expired" });
  }
};

export default protect;

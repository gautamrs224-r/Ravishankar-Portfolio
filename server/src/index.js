import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables FIRST before any other imports that need them
dotenv.config();

import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────

// Allow all origins in development, restrict in production
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development — restrict this in production
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ravishankar Portfolio API is running",
    version: "1.0.0",
    endpoints: [
      "POST   /api/auth/login",
      "GET    /api/auth/verify",
      "GET    /api/projects",
      "GET    /api/skills",
      "GET    /api/journey",
      "GET    /api/hero",
      "POST   /api/messages  (contact form)",
    ],
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/messages", messageRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ── Start server ──────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔐 Admin email: ${process.env.ADMIN_EMAIL}`);
});
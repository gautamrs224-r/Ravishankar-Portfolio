import express from "express";
import {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Public — contact form submits here
router.post("/", createMessage);

// Admin only
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessage);
router.put("/:id", protect, updateMessage);
router.delete("/:id", protect, deleteMessage);

export default router;

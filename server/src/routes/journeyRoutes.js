import express from "express";
import {
  getJourneyEntries,
  getJourneyEntry,
  createJourneyEntry,
  updateJourneyEntry,
  deleteJourneyEntry,
} from "../controllers/journeyController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/", getJourneyEntries);
router.get("/:id", getJourneyEntry);
router.post("/", protect, createJourneyEntry);
router.put("/:id", protect, updateJourneyEntry);
router.delete("/:id", protect, deleteJourneyEntry);

export default router;

import Journey from "../models/Journey.js";

// GET /api/journey — public
export const getJourneyEntries = async (req, res) => {
  try {
    const entries = await Journey.find().sort({ order: 1, year: 1 });
    res.json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/journey/:id — public
export const getJourneyEntry = async (req, res) => {
  try {
    const entry = await Journey.findById(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/journey — admin only
export const createJourneyEntry = async (req, res) => {
  try {
    const entry = await Journey.create(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/journey/:id — admin only
export const updateJourneyEntry = async (req, res) => {
  try {
    const entry = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/journey/:id — admin only
export const deleteJourneyEntry = async (req, res) => {
  try {
    const entry = await Journey.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });
    res.json({ success: true, message: "Journey entry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

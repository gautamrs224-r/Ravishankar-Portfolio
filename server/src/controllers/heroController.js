import Hero from "../models/Hero.js";

// GET /api/hero — public
// Always returns the single hero document, creating defaults if none exists yet
export const getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      // First-time setup: create the singleton with schema defaults
      hero = await Hero.create({});
    }
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/hero — admin only
// Merges the incoming fields with the existing document (partial update supported)
export const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

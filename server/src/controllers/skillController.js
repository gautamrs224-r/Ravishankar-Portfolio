import Skill from "../models/Skill.js";

// GET /api/skills — public, returns all skills grouped by category
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });

    // Group by category for easy consumption by the frontend
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({ success: true, data: grouped, flat: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/skills/:id — public
export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/skills — admin only
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/skills/:id — admin only
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/skills/:id — admin only
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
    res.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

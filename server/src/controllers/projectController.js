import Project from "../models/Project.js";

// GET /api/projects — public, returns all published projects sorted by order
export const getProjects = async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { published: true };
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/projects/:id — public
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/projects — admin only
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/projects/:id — admin only
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/projects/:id — admin only
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/projects/reorder — admin only
// Body: { order: ["id1", "id2", "id3"] }
export const reorderProjects = async (req, res) => {
  try {
    const { order } = req.body;
    const updates = order.map((id, index) =>
      Project.findByIdAndUpdate(id, { order: index })
    );
    await Promise.all(updates);
    res.json({ success: true, message: "Projects reordered" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

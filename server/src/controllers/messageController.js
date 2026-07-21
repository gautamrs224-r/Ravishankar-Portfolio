import Message from "../models/Message.js";

// POST /api/messages — public (called by the contact form)
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/messages — admin only
export const getMessages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.unread === "true") filter.read = false;
    if (req.query.starred === "true") filter.starred = true;

    const messages = await Message.find(filter).sort({ createdAt: -1 });
    const unreadCount = await Message.countDocuments({ read: false });

    res.json({ success: true, data: messages, unreadCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/messages/:id — admin only
export const getMessage = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/messages/:id — admin only (mark read / toggle star)
export const updateMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, data: msg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/messages/:id — admin only
export const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

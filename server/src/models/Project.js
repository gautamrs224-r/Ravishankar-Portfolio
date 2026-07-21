import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    categoryColor: { type: String, default: "bg-primary/20 text-primary-light border-primary/30" },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    image: { type: String, required: true },
    tech: [{ type: String, trim: true }],
    features: [{ type: String }],
    challenges: { type: String, default: "" },
    gallery: [{ type: String }],
    liveUrl: { type: String, default: "#" },
    githubUrl: { type: String, default: "#" },
    role: { type: String, default: "Solo Developer" },
    duration: { type: String, default: "" },
    year: { type: String, default: "" },
    order: { type: Number, default: 0 },      // controls display order
    featured: { type: Boolean, default: false }, // shown on homepage preview
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Code2" },
    side: { type: String, enum: ["left", "right"], default: "left" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Journey", journeySchema);

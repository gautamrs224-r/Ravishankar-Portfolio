import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "database", "tools", "learning"],
    },
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true },   // icon key from iconRegistry
    color: { type: String, default: "#FFFFFF" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);

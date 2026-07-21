import mongoose from "mongoose";

// Hero is a singleton — only one document exists in this collection.
// The controller always does findOneAndUpdate with upsert:true.
const heroSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Ravishankar Gautam" },
    firstName: { type: String, default: "Ravishankar" },
    role: { type: String, default: "Aspiring Full Stack MERN Developer" },
    tagline: { type: String, default: "I build beautiful, user-friendly and high-performance web applications using the MERN stack." },
    availableForWork: { type: Boolean, default: true },
    stats: {
      projects: { type: String, default: "25+" },
      contributions: { type: String, default: "800+" },
      followers: { type: String, default: "18" },
      streak: { type: String, default: "31" },
    },
    floatingImageUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "/Ravishankar_Gautam_Resume.pdf" },
    social: {
      github: { type: String, default: "https://github.com/gautamrs224-r/" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);

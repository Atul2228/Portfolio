import mongoose  from "mongoose";

const educationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  degree: { type: String, required: true }, // Example: "MCA"
  institution: { type: String, required: true },
  year: { type: String, required: true }, // Example: "2022-2024"
  // description: { type: String } // Optional: Relevant coursework or achievements
}, { timestamps: true });
export const Education=mongoose.model('Education', educationSchema);

import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true, 
    enum: ["Technical Skills", "Soft Skills", "Other Skills"] 
  }, 
  skills: { 
    type: String, 
    required: true 
  } , 
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
 
}, { timestamps: true });


export  const  Skill=mongoose.model('Skill', skillSchema);


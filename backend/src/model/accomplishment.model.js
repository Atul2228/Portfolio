import mongoose  from "mongoose";

const accomplishmentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true }, // Example: "React.js Certification"
  issuer: { type: String, required: true }, // Example: "Coursera"
  dateOfAccomplishment: { type: Date , default: Date.now}, // Date of accomplishment
  description: { type: String }, // Optional: Extra details
  certificate: { 
    type: String ,
    required:true
  },

}, { timestamps: true });


export const Accomplishment=mongoose.model('Accomplishment', accomplishmentSchema);

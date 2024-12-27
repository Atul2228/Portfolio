import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User
  jobTitle: { 
    type: String, 
    required: true 
  }, // Example: "Fullstack Developer"
  company: { 
    type: String, 
    required: true 
  }, // Example: "ABC Tech Solutions"
  startDate: { 
    type: Date, 
    required: true 
  }, // When the job started
  endDate: { 
    type: Date ,
    default: Date.now
  }, // When the job ended (null if currently working)
  location: { 
    type: String 
  }, // Example: "Remote", "New York, USA"
  responsibilities: [{ 
    type: String 
  }], // Example: ["Developed APIs", "Implemented CI/CD pipelines"]
  technologies: [{ 
    type: String 
  }], 
  certificate: { 
    type: String 
  }, // URL or path of the certificate file
}, { timestamps: true });

// module.exports = mongoose.model('Experience', experienceSchema);

export const Experience=mongoose.model('Experience', experienceSchema);
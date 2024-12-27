import mongoose  from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }], // Example: ["User Authentication", "Product Filters"]
  technologies: [{ type: String }], // Example: ["React.js", "Node.js", "MongoDB"]
  liveDemo: { type: String }, // URL of live project
  githubRepo: { type: String }, // URL of GitHub repo
  image: { type: String,required:true } // URL to project image
}, { timestamps: true });

// module.exports = mongoose.model('Project', projectSchema);
export const  Project =mongoose.model("Project",projectSchema)


import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true }, // Example: "Fullstack Web Developer"
  username:{type:String,required :true},
  about: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  avatar:{
    type:String,
    required:true
  },
  location: { type: String }, // Example: "Lucknow, India"
  github: { type: String },
  linkedin: { type: String },

  
  password:{
    type:String,
    required:true
  },
 
}, { timestamps: true });
userSchema.pre("save",async function(next){
    if(!this.isModified) return next()
     this.password=await bcrypt.hash(this.password,10)
    next()

})

userSchema.methods.isPasswordCorrect=async function(password){
    if(!password) return null
    return await bcrypt.compare(password,this.password)

}
// userSchema.methods.generateAccessToken=async function(){
//     jwt.sign({
//     _id:this._id
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn: process.env.ACCESS_TOKEN_EXPIRY

//     })
    

// }

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
        
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

userSchema.methods.generateRefreshToken=async function(){
    jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
    
}



// module.exports = mongoose.model('User', userSchema);
export const User=mongoose.model("User",userSchema)

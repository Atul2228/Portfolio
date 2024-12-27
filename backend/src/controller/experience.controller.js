import { asynHandler } from "../utility/asyncHandler.js";
import { Experience } from "../model/experience.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
const addExperience=asynHandler(async(req,res)=>{
    const {
        jobTitle,
        company,
        startDate,
        endDate,
        location,
        responsibilities,
        technologies}=req.body
    if([jobTitle,company, startDate].some((field)=>{field.trim()===""})){
       throw new ApiError(401,"title and issuer are required")
    }
    const certificatePath=req.files.find(file=>file.fieldname==="certificate")?.path
    if(!certificatePath){
       throw new ApiError(401,"certificate is required")
    }
    const certificate=await uploadOnCloudinary(certificatePath)
 
    const addedExperience =await Experience.create({
       userId:req.user._id,
       jobTitle,
        company,
        startDate,
        endDate:endDate,
        location:location||"",
        responsibilities:responsibilities||[],
        technologies:technologies||[],      
       certificate:certificate.url
    })
    const experienceAdd=await Experience.findById(addExperience._id)
 
    if(!experienceAdd){
       throw new ApiError(500,"Something went wrong while adding accomplishment")
    }
    return res.status(201).json(
       new ApiResponse(201,experienceAdd,"SuccessFully created")
    )
 

})
const deleteExperience=asynHandler(async(req,res)=>{
   const {Experience_Id}=req.params
   const deletedExperience=await Experience.findByIdAndDelete(Experience_Id)
   if(!deletedExperience){
      throw new ApiError(500,"Something went wrong while deleting Experience")
   }
  return  res.status(201).json(
      new ApiResponse(201,deletedExperience,"SuccessFully deleted")
   )
    
    
})
const updateExperience=asynHandler(async(req,res)=>{
   const {Experience_Id}=req.params
   const {
      jobTitle,
      company,
      startDate,
      endDate,
      location,
      responsibilities,
      technologies}=req.body
  if([jobTitle,company, startDate].some((field)=>{field.trim()===""})){
     throw new ApiError(401,"title and issuer are required")
  }
  const updatedExperience =await Experience.updateOne(Experience_Id,{ 
   $set:{
      jobTitle,
      company,
      startDate,
      endDate:endDate,
      location:location,
      responsibilities:responsibilities,
      technologies:technologies,   
   }
      
     
  },{new :true})


  if(!updatedExperience){
     throw new ApiError(500,"Something went wrong while adding accomplishment")
  }
  return res.status(201).json(
     new ApiResponse(201,updatedExperience,"SuccessFully created")
  )

 

})
const getAllExperience= asynHandler(async(req,res)=>{
   const {userID}=req.user._id
   const allUserExperience=await Experience.find(userID)
   return  res.status(201).json(
      new ApiResponse(201,allUserExperience,"SuccessFully got all accomplishments accessed")
   )


    
})


export {
    addExperience,
    deleteExperience,
    updateExperience,
    getAllExperience
}
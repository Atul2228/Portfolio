import {asyncHandler} from '../utility/asyncHandler.js'
import ApiError from "../utility/ApiError.js"
import ApiResponse from "../utility/ApiResponse.js"
import {uploadOnCloudinary} from "../utility/cloudinary.js"
import {Accomplishment} from "../model/accomplishment.model.js"
const addAccomplishment=asyncHandler(async(req,res)=>{
   const {title,issuer,dateOfAccomplishment,description}=req.body
   if([title,issuer].some((field)=>{field.trim()===""})){
      throw new ApiError(401,"title and issuer are required")
   }
   const certificatePath=req.files.find(file=>file.fieldname==="certificate")?.path
   if(!certificatePath){
      throw new ApiError(401,"certificate is required")
   }
   const certificate=await uploadOnCloudinary(certificatePath)

   const accomplishment=await Accomplishment.create({
      userId:req.user._id,
      title,
      issuer,
      dateOfAccomplishment:dateOfAccomplishment,
      description:description||"",
      certificate:certificate.url
   })
   const accomplishmentCreated=await Accomplishment.findById(accomplishment._id)


   if(!accomplishmentCreated){
      throw new ApiError(500,"Something went wrong while adding accomplishment")
   }

   return res.status(201).json(
      new ApiResponse(201,accomplishmentCreated,"SuccessFully created")
   )




})
const deleteAccomplishment=asyncHandler(async(req,res)=>{
   const {Accomplishment_Id}=req.params
   const deletedAccomplishment=await Accomplishment.findByIdAndDelete(Accomplishment_Id)
   if(!deletedAccomplishment){
      throw new ApiError(500,"Something went wrong while deleting Accomplishment")
   }
  return  res.status(201).json(
      new ApiResponse(201,deletedAccomplishment,"SuccessFully deleted")
   )
    
})
const updateAccomplishment=asyncHandler(async(req,res)=>{
   const {title,issuer,dateOfAccomplishment,description}=req.body
   const {Accomplishment_Id}=req.params

   if([title,issuer].some((field)=>{field?.trim()===""}))
   {
      throw new ApiError(401,"title and issuer cannot empty")
   }
   const updatedAccomplishment=await Accomplishment.findByIdAndUpdate(Accomplishment_Id,{
      $set:{
         title:title,
         issuer:issuer,
         dateOfAccomplishment:dateOfAccomplishment||"",
         description:description||""
      }
   })

   return  res.status(201).json(
      new ApiResponse(201,updateAccomplishment,"SuccessFully updated")
   )
    
})

const updateAccomplishmentCertificate=asyncHandler(async(req,res)=>{
   const { Accomplishment_id}= req.params
   const newCeritficatePath=req.files.find(file=>file.fieldname==="certificate")?.path
   if(!newCeritficatePath){
      throw new ApiError(401,"new cerficate is required for updation")
   }
   const certificate=await uploadOnCloudinary(newCeritficatePath)
   const updatedOne=await Accomplishment.updateOne(Accomplishment_id,{
      $set:{
         certificate:certificate.url
      }
   })
   return  res.status(201).json(
      new ApiResponse(201,updatedOne,"SuccessFully updated")
   )

})
const getAllAccomplishment=asyncHandler(async(req,res)=>{
   const {userID}=req.user._id
   const allUserAccomplishments=await Accomplishment.find(userID)
   return  res.status(201).json(
      new ApiResponse(201,allUserAccomplishments,"SuccessFully got all accomplishments accessed")
   )

})

export {
   addAccomplishment,
   deleteAccomplishment,
   updateAccomplishment,
   updateAccomplishmentCertificate,
   getAllAccomplishment
}
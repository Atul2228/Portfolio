import {asyncHandler} from '../utility/asyncHandler.js'
import {ApiError} from "../utility/ApiError.js"
import {ApiResponse} from "../utility/ApiResponse.js"
import { Education } from '../model/education.model.js'
const addEducation=asyncHandler(async(req,res)=>{
    const {degree,institution,year}=req.body
    if([degree,institution,year].some((field)=>{field?.trim()===""})){
        throw new ApiError(401,"All fields are required")
    }
    const education=await Education.create({
        degree,
        institution,
        year
    })
    const addEducation=await Education.findById(education._id)
    if(!addEducation){
        throw new ApiError(500,"Something went wrong while adding education details")
    }
    return res.status(201)
    .json(
        new ApiResponse(201,addEducation,"Education added successfully")
    )
})
const deleteEducation=asyncHandler(async(req,res)=>{
    const {Education_Id}=req.params
    const deletedEducation=await Education.findByIdAndDelete(Education_Id)
    if(!deleteEducation){
        throw new ApiError(401,"Education detail with this does not exist")
    }
    return res.status(201)
    .json(
        new ApiResponse(201,deleteEducation,"Education deleted successfully")
    )
    
})
const updateEducation=asyncHandler(async(req,res)=>{
    const {degree,institution,year}=req.body
    const {Education_Id}=req.params 
    if([degree,institution,year].some((field)=>{field?.trim()===""})){
        throw new ApiError(401,"All fields are required")
    }
    const educationUpdated=await Education.updateOne(Education_Id,{
      $set:{  degree:degree,
        institution:institution,
        year:year}
    },{new : true})
    
 
    return res.status(201)
    .json(
        new ApiResponse(201,educationUpdated,"Education updated successfully")
    )
})
const getAllEducation=asyncHandler(async(req,res)=>{
   const {userID}=req.user._id
   const allUserEducation=await Education.find(userID)
   return  res.status(201).json(
      new ApiResponse(201,allUserEducation,"SuccessFully got all accomplishments accessed")
   )

})
export {
    addEducation,
    updateEducation,
    deleteEducation,
    getAllEducation
}
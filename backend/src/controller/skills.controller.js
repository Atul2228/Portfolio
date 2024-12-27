import {asyncHandler} from '../utility/asyncHandler.js'
import {User} from "../model/user.model.js"
import { Skill } from '../model/skills.model.js'
import ApiError from "../utility/ApiError.js"

const addSkill=asyncHandler(async(req,res)=>{
    const {category,skill}=req.body
    if([category,skill].some((field)=>{field?.trim()===""})){
        throw new ApiError(401,"All fields are required")
    }
    const skil=await Skill.create({
        category,
        skill,
        userId:req.user._id
    })
    if(!skil){
        throw new ApiError(401,"Something wenr wrong while Adding Skill")
    }
    return res.status(201).json(
        new ApiResponse(201,skil,"Skill add successfully")
    )

})
const deleteSkill=asyncHandler(async(req,res)=>{
    const {skill_id}=req.params
    const skil=await Skill.findByIdAndDelete(skill_id)
    return res.status(201).json(
        new ApiResponse(201,skil,"Skill deleted successfully")
    )

})

const getAllUserSkills=asyncHandler(async(req,res)=>{
    const {userID}=req.user._id
    const allUserSkills=await Skill.find(userID)
    return  res.status(201).json(
       new ApiResponse(201,allUserSkills,"SuccessFully got all accomplishments accessed")
    )
 })
export {
    addSkill,
    deleteSkill,
    getAllUserSkills
}

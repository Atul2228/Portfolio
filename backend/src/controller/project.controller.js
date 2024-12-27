import { asynHandler } from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js"
import ApiResponse from "../utility/ApiResponse.js"
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import { Project } from "../model/project.model.js";

const addProject=asynHandler(async(req,res)=>{
    const {
        title,
        description,
        features,
        technologies,
        liveDemo,
        githubRepo}=req.body
        if([title,description].some((field)=>field?.trim()===""))
        {
            throw new ApiError(401,"title and description are required")
        }
        const imagePath=req.files.find(file=>file.filname==="image")?.path
        if(!imagePath){
            throw new ApiError(401,"Image is required")
        }
        const image=await uploadOnCloudinary(imagePath)

        const project=await Project.create({
            userId:req.user._id,
            title,
            description,
            features:features||[],
            technologies:technologies||[],
            liveDemo:liveDemo||"",
            githubRepo:githubRepo||"",
            image:image.url
        })
        const Projectadded=await Project.findById(project._id)
        
        if(!Projectadded){
            throw new ApiError(500,"Somthing went while creating Project")
        }
        return res.status(201).json(
            new ApiResponse(201,Projectadded,"Project Added successfully")
        )
    
    
})
const updateProjectDetails=asynHandler(async(req,res)=>{
    const {  
         title,
        description,
        features,
        technologies,
        liveDemo,
        githubRepo}=req.body
        const {Project_id}=req.params

        if([title,description].some((field)=>field?.trim()===""))
            {
                throw new ApiError(401,"title and description are required")
            }

        const updatedProjectDetails=await Project.updateOne(Project_id,{
            $set:{
                title:title,
                description:description,
                features:features||[],
                technologies:technologies||[],
                liveDemo:liveDemo,
                githubRepo:githubRepo
            }
        },{new :true})

        return res.status(201).json(
            new ApiResponse(201,updatedProjectDetails,"Project updated successfully")
        )    
})
const deleteProject=asynHandler(async(req,res)=>{
    const {Project_id}=req.params
    const deletedProject=await Project.findByIdAndDelete(Project_id)
    return res.status(201).json(
        new ApiResponse(201,deletedProject,"Project deleted successfully")
    ) 
     
})

const getAllProjects=asyncHandler(async(req,res)=>{
    const {userID}=req.user._id
    const allUserProjects=await Project.find(userID)
    return  res.status(201).json(
       new ApiResponse(201,allUserProjects,"SuccessFully got all Projects accessed")
    )
 
 })


export {
    addProject,
    updateProjectDetails,
    deleteProject,
    getAllProjects

}
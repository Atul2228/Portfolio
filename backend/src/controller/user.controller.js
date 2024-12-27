import  {asynHandler} from "../utility/asyncHandler.js"
import {User} from "../model/user.model.js"
import { ApiError } from "../utility/ApiError.js"
import {ApiResponse} from "../utility/ApiResponse.js"
import {uploadOnCloudinary} from "../utility/cloudinary.js"

// const genetateAccessToken=asynHandler(async(_id)=>{
//     try {
//         const user=await  User.findById(_id)
//     if(!user) throw new ApiError(401,"User with this ID doesnot Exists")
//         const accessToken=user.generateAccessToken()
//         return {accessToken}
        
//     } catch (error) {
//         console.log("Something went wrong while generating refresh And access Token");   
//     }

// })

const genetateAccessToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        // const refreshToken = user.generateRefreshToken()

        // user.refreshToken = refreshToken
        // await user.save({ validateBeforeSave: false })

        return {accessToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating  access token")
    }
}

const register=asynHandler(async(req,res)=>{
    const {name,title,about,email,phone,location,password,github,linkedin,username}=req.body
    const avatarPath=req.files.find(file=>file.fieldname==="avatar")?.path

    if([name,title,about,email,password,username].some((field)=>{field?.trim()===""}))
    {
        throw new ApiError(401,"name,title,about,email,password are required fields you cannot left them empyt")
    }
    // if ([name, title, about, email, password, username].some(field => field.trim() === "")) {
    //     throw new ApiError(401, "name, title, about, email, password, and username are required fields; you cannot leave them empty");
    // }
    const alredyExist=await User.findOne({email})
    if(alredyExist){
        throw new ApiError(401,"User with this email already exists")
    }
    if(!avatarPath){
        throw new ApiError(401,"avatar is required")
    }
    const avatar=await uploadOnCloudinary(avatarPath)
    if(!avatar){
        throw new ApiError(401,"something went uploading avatar on cloudinary")
    }
    const user=await User.create({
        name,
        username,
        title,
        about,
        email,
        phone:phone||"",
        location:location||"",
        github:github||"",
        linkedin:linkedin||"",
      
        password:password,
        avatar:avatar.url
    })
    const  userCreated=await User.findOne(user._id).select(
        "-password "
       )
      
       
       if(!userCreated){
        throw new ApiError(500,"something went wrong while registering")
       }
    
       return res.status(201).json(
        new ApiResponse(
            201,
            userCreated,
            "successfully registerd",
        )
       )
   

})

const login=asynHandler(async(req,res)=>{
    const {email,password}=req.body
    console.log(email);
    console.log(login);
    
    
    if([email,password].some((field)=>{field?.trim()===""})){
        throw new ApiError(401,"Email and Password both are required")
    }
    const user=await User.findOne(email)
    if(!user){
        throw new ApiError(401,"User does not exists with this email")
    }
    const isPasswordCorrect=user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid Password")
    }
    const {accessToken}=await genetateAccessToken(user._id)
    
    console.log(accessToken);
    

    const loggedInUser=await User.findById(user._id).select(
        " -password ")

    const options={
        httpOnly:true,
        secure:true
    }
    // return res.status(201)
    // .cookie("accessToken", accessToken, options)
    // .json(new ApiResponse(201,loggedInUser,"User logged in successfuly"))



    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken
            },
            "User logged In Successfully"
        )
    )
})

// const login = asynHandler(async(req,res)=>{
//     //get username and password from user 
//     const { email , password} = req.body
//     //verify its not empty fields
//     if([email,password].some((field)=>{field?.trim()===""})){
//                 throw new ApiError(401,"Email and Password both are required")
//             }

//     //find username or email in database
//    const DBuser = await User.findOne(email)
//    //show error if we not find user
//    if (!DBuser) {
//     throw new ApiError(401, "User does not exist");
//   }

//   const storedHash = DBuser.password;
//   //console.log(`Stored hashed password: ${storedHash}`);

//    //check password
  
//    const isPasswordValid = await DBuser.isPasswordCorrect(password);


//    if(isPasswordValid == false){
//     throw new ApiError(401,"Invalid user credentials , provide correct password or emailId/username")
//    }
//    //give refresh token to user and save user with that token in DB and get return RT & AT
//    const {accessToken} = await genetateAccessToken(DBuser._id)

//    //now we have to send cookies to user but not password and 
//    const loggedInUser = await User.findById(DBuser._id).select("-password ")
   
//    const options = {
//         httpOnly : true ,
//         secure : true 
//    }

//    return res
//    .status(200)
//    .cookie("accessToken", accessToken, options)
//    .json(
//        new ApiResponse(
//            200, 
//            {
//                user: loggedInUser, accessToken
//            },
//            "User logged In Successfully"
//        )
//    )
// })



const getCurrentUser=asynHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)

    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "successfully user ,loaded"
            
        )
       )
    

})
const logout=asynHandler(async(req,res)=>{

    // options={
    //     httpOnly:true,
    //     secure:true
    // }
    // return res.status(201)
    // .clearCookies("accessToken",options)
    // .json(
    //     new ApiResponse(201,"User logged out successfully")
    // )
  
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})
const updateAvatar=asynHandler(async(req,res)=>{
    const {avatarPath}=req.files.find(file=>file.fieldname==="avatar")?.path
    if(!avatarPath)throw new ApiError(401,"avatar is required")
    const avatar=await uploadOnCloudinary(avatarPath)
    const user =await User.findById(req.user?._id,{
        $set:{
            avatar:avatar.url
        }
    },{
        new:true
    }).select("-password")

   return res.status(201).json(new ApiResponse(201,user,"avatar updated successfully"))





    

})
const updateDetails=asynHandler(async(req,res)=>{

     const {name,title,about,phone,location,github,linkedin,portfolio}=req.body
        const {Education_Id}=req.params 
        if([degree,institution,year].some((field)=>{field?.trim()===""})){
            throw new ApiError(401,"All fields are required")
        }
        const updateUser=await User.updateOne(Education_Id,{
          $set:{ 
            name:name,
            title:title,
            about:about,
            phone:phone,
            location:location,
            github:github,
            linkedin:linkedin,
            portfolio:portfolio
           }
        },{new : true})
        
        return res.status(201)
        .json(
            new ApiResponse(201,updateUser,"User details updated successfully")
        )

})

const updatePassword=asynHandler(async(req,res)=>{
    const {oldPassword,newPasswor}=req.body
    const user=await User.findById(req.user._id)
    const passwordMatched=user.isPasswordCorrect(oldPassword)
    if(!passwordMatched){
        throw new ApiError(401,"oldPassword is Incorrect")
    }
    user.password=newPasswor
    user.save({validateBeforeSave:true})

    return res.status(201).json(
        new ApiResponse(201,{},"Password changed successfully")
    )

})

const getProfile=asynHandler((req,res)=>{

})

export {
    register,
    login,
    getCurrentUser,
    logout,
    updateAvatar,
    updateDetails,
    updatePassword,
    getProfile

}
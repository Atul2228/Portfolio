
import { ApiError } from "../utility/ApiError.js"
import { asynHandler } from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";
import { log } from "console";

// export const verifyJWT = asynHandler(async(req, _, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
//         // console.log(token);
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request")
//         }

//         // if (!token || typeof token !== "string") {
//         //     throw new ApiError(401, "Unauthorized request")
//         // }
//         console.log("############################");
        
//         console.log(token);
//     // const TokenNew=token.toString()
  
    
        
//         // console.log("Hello ijoijoigijur;ela");
        
    
//         // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//         // const decodedToken = jwt.verify(token,"dsgfdngfkgk7687ylku09809i809-9yw4323465i6lylyil" );
      
        
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
//         if (!user) {
            
//             throw new ApiError(401, "Invalid Access Token")
//         }
    
//         req.user = user;
//         console.log(req.uer);
        
//         next
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }
    
// })


// export const verifyJWT =asynHandler (async (req,res ,next) =>{
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
//         //console.log(token)
//         if(! token){
//             throw new ApiError(404,"Unauthorized request")
//         }
    
//         //now we have a access token but wee have to verify it with our access token secret key from env file for authenticate that this is a token which we generate for user 
//         const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
//         //to access user , we have _id inside a token , so with it we will get complete user detail from DB and remove password and refresh token field from it
//         const user = await User.findById(decodedToken?._id).select(" -password ")
        
//        if(!user){
//         throw new ApiError(401,"invalid access token")
//        }
    
//        //after remove password and refresh token from that user detail comes from DB , we will pass it into user req and call next()
//        req.user = user    //via this we provide all user details in req
//        console.log("###############################");
       
    
//        next()
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }

// })


// export const verifyJWT = asynHandler(async (req, res, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
//         if (!token) {
//             throw new ApiError(404, "Unauthorized request");
//         }
        
//         // Verify the token
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
//         // Find the user in the database
//         const user = await User.findById(decodedToken?._id).select("-password");
        
//         if (!user) {
//             throw new ApiError(401, "Invalid access token");
//         }
        
//         // Attach user details to the request object
//         req.user = user;
//         console.log("###########################################");
        
        
//         // Call the next middleware
//         next()
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token");
//     }
// });'



export const verifyJWT = asynHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;

        console.log("################################");
        
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})





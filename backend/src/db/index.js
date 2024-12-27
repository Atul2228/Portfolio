import mongoose from "mongoose"
import { DB_Name } from "../constant.js";

const connectDb=async()=>{
    try {
    const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${DB_Name}`)
    console.log(`Connected Successfuly|| ${connectionInstance} `);
    } catch (error) {
        console.log(`Error while connecting to database ${error}`);
        
        process.exit(1)  
    }
    

}
export {connectDb}
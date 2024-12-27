import { connectDb } from "./db/index.js";
import dotenv from "dotenv"
import {app} from "./app.js"
// dotenv.config({
//     path:"./.env"
// })
dotenv.config({
    path: './.env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT||3000,(req,res)=>{
        console.log(`listening at PORT ${process.env.PORT}`);
    })
}  
)
.catch((error)=>{
    console.log(`error from src/index.js ${error}`);
    

})
import {Router} from "express"
import {register,login,logout} from "../controller/user.controller.js"
import {upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()
router.route("/register").post(upload.any(),register)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)

export default router

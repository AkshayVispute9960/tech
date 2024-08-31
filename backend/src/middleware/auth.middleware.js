import { ApiError } from '../utils/ApiError.js'
import { asyncHandler} from '../utils/asyncHandler.js'
import jwt from "jsonwebtoken"
import { User} from '../modles/user.modle.js'

export const verifyJWT = asyncHandler( async(req, _, next) => {
     const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","");
     if(!token){
        throw new ApiError(401,"Unauthorized error")
     }

     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     console.log("user",user._id)
     
     if(!user){
        throw new ApiError(401, "Invalid Access token")
     }

     req.user = user
     next()
})
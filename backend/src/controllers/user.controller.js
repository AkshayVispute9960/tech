import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../modles/user.modle.js";
import { ApiError } from "../utils/ApiError.js"
// import {sendVerificationEmail } from '../utils/mailValidation.js'

const generateAccessAndRefreshToken = async( userId ) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async ( req,res ) => {
  
     const { firstName, lastName, email, password} = req.body
     if (
        [firstName, email, lastName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

     const exitsingUser = User.findOne({ email })

     if(!exitsingUser){
        throw new ApiError(400,"user exits with this emailId")
     }

     const user = await User.create({
       firstName,
       lastName,
       email,
       password,
       role: 'customer'
     })
     await user.save();
    //  await sendVerificationEmail(user, req); 
    const createUser = await User.findById(user?._id).select("-password -refreshToken")

    if(!createUser){
        throw new Error(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createUser, "user created successful")
    )
})

const adminRegister =  asyncHandler( async ( req, res ) => {
    const { firstName, lastName, email, password} = req.body
     if (
        [firstName, email, lastName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

     const exitsingUser = User.findOne({ email })

     if(!exitsingUser){
        throw new ApiError(400,"user exits with this emailId")
     }

     const user = await User.create({
       firstName,
       lastName,
       email,
       password,
       role: 'admin'
     })
     await user.save();
    const createUser = await User.findById(user?._id).select("-password -refreshToken")

    if(!createUser){
        throw new Error(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createUser, "admin created successful")
    )
})
 
const adminLogin = asyncHandler(async (req,res) => {
    const { email,password }  = req.body;
    const user = await User.findOne({ email })
 
    if(!user){
     throw new ApiResponse(404,"User does'nt exits")
    }
     
    if (!user || user.role !== 'admin') {
        return res.status(400).json({ message: 'You are not allowed to login from here' });
      }

    const checkPassword = await user.isPasswordCurrect(password);
    
    if(!checkPassword){
     throw new ApiResponse(404, "Incurrect creadential")
    }
 
    const { accessToken, refreshToken }  = await generateAccessAndRefreshToken(user._id);
    
    console.log(accessToken,refreshToken)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
 
    const option = {
     httpOnly :true,
     secure: true
    }
 
    return res.status(201)
    .cookie("accessToken", accessToken,option)
    .cookie("refreshToken", refreshToken,option)
    .json(
     new ApiResponse(
         200,
         {
             user:loggedInUser, accessToken, refreshToken
         },
         "user logged in successfully"
     )
    )
})

export {
    registerUser,
    adminRegister,
    adminLogin
}
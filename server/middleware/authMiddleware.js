const jwt = require('jsonwebtoken')
const USERPROJECT = require("../models/userModel");
const asyncHandler = require("express-async-handler")


exports.protect = asyncHandler( async (req,res,next)=>{
    try{

        const token = req.cookies.token
        // const user = req.cookies.user

        if(!token){
            res.status(401)
            throw new Error("Not authorised,Please login")
        }

        //Verify Token

        const tokenverified = jwt.verify(token,process.env.JWT_SECRET)
        // const usertokenVerified = jwt.verify(user,process.env.JWT_SECRET)

        //GET USER_ID FROM TOKEN

        const userCheck = await USERPROJECT.findById(tokenverified.id).select("-password")

        if(!userCheck){
            res.status(400)
            throw new Error("User Not Found");
        }

        req.user = userCheck;

        next();

    }catch(error){
        res.status(400)
        throw new Error("User Not Authorised")
    }
})
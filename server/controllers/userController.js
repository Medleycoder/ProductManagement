const asyncHandler = require('express-async-handler')
const USERPRODUCT = require('../models/userModel') 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const slugify = require('slugify')

const {comparePassword} = require('../helpers/password')

const generateToken = (id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
}




//////////////////////////////REGISTER USER//////////////////////////////////

exports.registerUserController = asyncHandler( async (req,res)=>{
  
   const {name,email,password,phone,photo,bio} = req.body;

   const slug = slugify(name)
   
   // const hashedPassword = await hashPassword(password)
   //validation//

   if(!name || !email || !password){
    res.status(400)
    throw new Error("Please Fill in all required Fields!!")
   }

   if(password.length <6){
    res.status(400)
    throw new Error("Password mustt be upto 6 characters")
   }

   //Check if the email already exist

   const emailExist = await USERPRODUCT.findOne({email})

   if(emailExist){
    res.status(400);
    throw new Error("Email Already Exist!!")
   }





   //Check if the email already exist

   //validation//

   //Create User//

   const user = await USERPRODUCT.create({
      name,
      email,
      password,
      slug
   })

   //Create User//


   
   //////GENERATE TOKEN//////

   const token = generateToken(user._id);

   ////SEND HTTP ONLY COOKIE TO CLIENT//

   res.cookie("token",token,{
      path     : "/",
      httpOnly : true,
      expires  : new Date(Date.now() + 1000 * 86400),   //current date + 1 day
      sameSite : "none",
      secure   : true
   })

   ////SEND HTTP ONLY COOKIE //


   //////GENERATE TOKEN//////



   if(user){

    const {_id,name,email,photo,phone,bio} = user;

    res.status(201).json({
       _id,
       name,
       email,
       photo,
       phone,
       bio,
       token
    })

   }else{
    res.status(400);
    throw new Error("Invalid User Data!!")
   }
})

//////////////////////////////REGISTER USER//////////////////////////////////






//////////////////////////////LOGIN USER/////////////////////////////////////

exports.loginUserController = asyncHandler(

   async (req,res)=>{


      const {email,password} = req.body;

      if(!email || !password){
         res.status(404);
         throw new Error("Email and password cant be empty")
      }

      //CHECK IF USER EXIST
       const user = await USERPRODUCT.findOne({email});

       if(!user){
          res.status(404);
          throw new Error("User not found Please signUp!!")
       }

       ////Now Checking password

       const passwordIsCorrect = await bcrypt.compare(password,user.password)



        
   //////GENERATE TOKEN//////

   const token = generateToken(user._id);

   ////SEND HTTP ONLY COOKIE TO CLIENT//

   res.cookie("token",token,{
      path     : "/",
      httpOnly : true,
      expires  : new Date(Date.now() + 1000 * 86400),   //current date + 1 day
      sameSite : "none",
      secure   : true
   })
   
   // res.cookie("user",user.slug,{
   //    path     : "/",
   //    httpOnly : true,
   //    expires  : new Date(Date.now() + 1000 * 86400),   //current date + 1 day
   //    sameSite : "none",
   //    secure   : true
   // })
   ////SEND HTTP ONLY COOKIE //


   //////GENERATE TOKEN//////




       if(user &&  passwordIsCorrect){

         const {_id,name,slug,email,photo,phone,bio} = user;

         res.status(200).json({
            _id,
            name,
            slug,
            email,
            photo,
            phone,
            bio,
            token
         });
       }else{
         res.status(400)
         throw new Error("Email or Password is Invalid!!")
       }
     

   }
)

//////////////////////////////LOGIN USER/////////////////////////////////////





///////////////////////////////LOGOUT USER//////////////////////////////////

exports.logoutUserController = asyncHandler( async (req,res)=>{
   const {token} = req.body;

  const user = await USERPRODUCT.findOne({token});

   ////EXPIRE THIS COOKIE//

   res.cookie("token","",{
      path     : "/",
      httpOnly : true,
      expires  : new Date(0),   //current date + 1 day
      sameSite : "none",
      secure   : true
   })
   return res.status(200).json({ message : "Logged Out Successfully!!" })

   ////EXPIRE THIS COOKIE //



   

})


///////////////////////////////LOGOUT USER//////////////////////////////////



//////////////////////////////GET SINGLE USER///////////////////////////////////

exports.getUserController = asyncHandler( async (req,res)=>{
   
//   const {slug} = req.params;

  const user = await USERPRODUCT.findOne(req.user._id);

  const {_id,name,email,photo,bio} = user;
  if(user){
   res.json({
      _id,
      name,
      email,
      photo,
      phone,
      bio
   })
  }else{
   res.status(400)
   throw new Error("User Not Found!!")
  }

})


//////////////////////////////GET SINGLE USER///////////////////////////////////



// module.exports = {
//     registerUserController,
// }

///ctrl+spacebar to automatic requires
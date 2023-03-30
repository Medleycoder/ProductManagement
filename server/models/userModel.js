const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

// const {hashPassword} = require('../helpers/password')

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : [true,"Please add a name"]
    },
    slug : {                                    /// slug is like parameter or can say as id
        type       : String,
        unique     : true,
        index      : true,
        lowercase  : true,
    },
    email : {
        type : String,
        required : [true,"Please add an email "],
        unique : true,
        trim : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email!!!"
        ]
    },
    password : {
        type : String,
        required : [true,"Please add a password!!"],
        minLength : [6,"Password must be upto 6"],
        // maxLength : [60,"Password must not be above 15 !!"],
        // match : [
        //     /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{6,23}$/gmu,
        //     "Please enter a valid Password with Special character!!!"
        // ]
    },
    photo : {
        type : String,
        required : [true,"Please add a photo"],
        default : "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone : {
        type  : String,
        default :"000-000-000"
    },
    bio : {
        type : String,
        maxLength : [250,"Bio must not be more than 250"],
        default : "Bio"
    }

},{timestamps:true});



//Encrypt the password before saving it to database



userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
           return next() 
    }
    //Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword
    
})

//////////////////////////////////////////




// 9844015015
// sugata 


const USERPRODUCT = mongoose.model('USER',userSchema)



module.exports = USERPRODUCT
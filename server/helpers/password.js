

const bcrypt = require('bcrypt')

///////////////////////////////////////////PASWORD HASH//////////////////////////////////////////////
exports.hashPassword =  (password)=>{
    return (
        new Promise((resolve,reject)=>{
            bcrypt.genSalt(12,(error,salt)=>{
                if(error){
                    reject(error)
                }

                bcrypt.hash(password,salt,(err,hash)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(hash)
                })
            })
        })
    )
}


///////////////////////////////////////////PASWORD HASH//////////////////////////////////////////////


//////////////////////////////////////////////Compare PassWORD HASH//////////////////////////////////


exports.comparePassword = (password,hashed)=>{

    return bcrypt.compare(password,hashed);
}


//////////////////////////////////////////////Compare PassWORD HASH//////////////////////////////////
const jwt = require('jsonwebtoken');



exports.requiresignin = (req,res,next) => {
    const {authorization} =req.headers

    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,"secret",(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged"})
        }else{
            const  {_id}= payload
            User.findById(_id).then(userdata=>{
            req.user= userdata
        })}
        
        next()
    })
}
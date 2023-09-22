const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError}=require('../errors')


const auth = async (req,res,next)=>{
    //header check
    try { 
        const authorization = req.headers.authorization
    if(!authorization||!authorization.startsWith('Bearer ')){ 
        throw new UnauthenticatedError('Unvalid Authentication')
    }
    const token= authorization.split(' ')[1]
        //token check 
        payload = jwt.verify(token, process.env.JWT_SECRET)

        //attaching user and routes to request for next()
        req.user={userId:payload.userId,name:payload.name}
        next() 
    } catch (error) {  
        next(error)
    } 
}

module.exports= auth
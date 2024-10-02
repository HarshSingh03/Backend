require('dotenv').config()
const UnauthenticatedError = require('../errors/UnauthenticatedError');
const User = require('../models/User')
const authentication = async (req,res,next)=>{
  const token = req.cookie.token;
  try{
    const payload = await jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password');
    req.user = {
      userId : user.id,
      email : user.email
    }
    next() } 
  catch(err){
    throw new UnauthenticatedError('Token Not Found')
  }
}

module.exports = authentication
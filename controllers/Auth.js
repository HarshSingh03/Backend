const User = require('../models/User')
const {BadRequest} = require('../errors')
const tokenGenerator = require('../utils/generate-token')
const UnauthenticatedError = require('../errors/UnauthenticatedError')
const signUp = async (req,res,next)=>{
  const {email, name, password, address} = req.body
  if (!email || !name || !password){
    throw new BadRequest('Please fill the necessary details ')
  }
  const existingUser = await User.findOne({email})
  console.log(existingUser)
  if(existingUser){
    throw new BadRequest('User already exists')
  }
  let user = {
    email,
    name,
    password,
    address:address
  }

  user =await User.create(user);
  const token = tokenGenerator(user._id)
  res.cookie('token', token, {withCredentials:true,httpOnly:true})
  res.status(200).json({ success:true, user:{name:user.name,address:user.address}, token });

}


const login = async (req,res,next)=>{
  const {email,password} = req.body
  if(!email || !password){
    throw new BadRequest('Please provide email and password')
  }
  const user =await User.findOne({email});
  if(!user){
    throw new UnauthenticatedError(`User with emailId : ${email} does not exist`)
  }
  const passwordMatching = await user.comparePassword(password)
  if(!passwordMatching){
    throw new UnauthenticatedError('Wrong Password')
  }
  const token = tokenGenerator(user._id);
  res.cookie('token',token,{withCredentials:true, httpOnly:true});
  return res.status(200).json({success:true, user:{name:user.name,email:user.email},token})
}


module.exports = {
  login,
  signUp
}
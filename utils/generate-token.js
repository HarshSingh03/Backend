require('dotenv').config()
const jwt = require('jsonwebtoken')

const  tokenGenerator = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})

}

module.exports = tokenGenerator
const CustomAPIError = require('../errors/custom-api-error')
const errorHandler = (err,req,res,next) => {
  let customError = {}
  if (err instanceof CustomAPIError){
    customError = {
      statusCode:err.statusCode,
      msg:err.message
    }  
  }
  else{
    customError = {
      statusCode:500,
      msg:'An error occured'
    }
  }
  
  return res.status(400).json(customError)
}

module.exports = errorHandler
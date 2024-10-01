const CustomAPIError = require('../errors/custom-api-error')
const errorHandler = (req,res,next,error) => {
  const error = new CustomAPIError('Error found',400)
  return error;
}
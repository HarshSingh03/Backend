const BadRequest = require('./BadRequest')
const NotFound = require('./NotFound')
const Unauthorized = require('./UnauthenticatedError')
const CustomAPIError = require('./custom-api-error')

module.exports = {
  BadRequest,
  NotFound,
  Unauthorized,
  CustomAPIError
}
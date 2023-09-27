const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    if (Object.keys(err.keyValue)[0] === "email") {
      customError.msg = `User already exists with *${err.keyValue['email']}* email please enter a unique email`;
    } else {
      customError.msg = `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      customError.statusCode = 409;
    }
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }
  return res.status(customError.statusCode).json({success:false,error: customError.msg })
}

module.exports = errorHandlerMiddleware
 
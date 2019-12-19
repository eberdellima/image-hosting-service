const { logError } = require('zippy-logger')
const ErrorHandler = require('../services/ErrorHandler')

module.exports = req => {
  try {
    let ip = req.connection.remoteAddress
    const index = ip.indexOf('1')
    ip = ip.substr(index)
    return ip
  } catch(err) {
    logError({message: err.message, path: 'middleware, ip parser'})
    throw new ErrorHandler(err.message, 409)
  }
}
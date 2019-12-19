
class ErrorHandler extends Error{
  constructor(message, status) {
    super(JSON.stringify({message, status}))
    this.message = JSON.stringify({message, status})
    this.msg = message
    this.status = status
  }
}

module.exports = ErrorHandler
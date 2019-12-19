const IpDeniedError = require('express-ipfilter').IpDeniedError

module.exports = () => {
  return (err, req, res, next) => {
    if (err instanceof IpDeniedError) {
      res.status(401)
    } else {
      res.status(err.status || 500)
    }
  
    res.send({
      message: 'Access Denied!',
      error: err
    })
  }
}

module.exports = req => {
  let ip = req.connection.remoteAddress
  const index = ip.indexOf('1')
  ip = ip.substr(index)
  return ip
}
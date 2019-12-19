const ipfilter = require('express-ipfilter').IpFilter
const ips = require('../configs/allowed-ips')
const ipParser = require('../src/middlewares/ip-parser')
const ipError = require('../src/middlewares/ip-error')

module.exports = (app) => {
  app.use(ipfilter(ips, {mode: 'allow', detectIp: ipParser, log: false} ))
  app.use(ipError())
}
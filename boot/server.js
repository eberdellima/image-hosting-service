const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

module.exports = (app) => {
  app.use('/static', express.static('public/imgs'))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
}
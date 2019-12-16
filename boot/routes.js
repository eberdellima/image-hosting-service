const imageRoutes = require('../src/routes/index')

module.exports = (app) => {
  app.use('/images', imageRoutes)
}
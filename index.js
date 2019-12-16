const { logError } = require('zippy-logger')
const { sequelize } = require('./boot/database')
const app = require('./boot/app')

const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    await sequelize.sync()
    app.listen(port, () => { console.log(`Listening on port ${port}`) })
  } catch(err) {
    logError({ message: err, path: 'Initializing application!' })
  }
}

startServer()
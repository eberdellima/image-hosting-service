const { logError } = require('zippy-logger')
const app = require('./boot/app')
const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    app.listen(port, () => { console.log(`Listening on port ${port}`) })
  } catch(err) {
    logError({ message: err, path: 'Initializing application!' })
  }
}

startServer()
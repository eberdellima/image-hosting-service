const Uploader = require('../services/Uploader')
const Repository = require('../services/Repository')
const { logError } = require('zippy-logger')

class ImageController {

  constructor() {
    const imageDir = path.join(__dirname, '/../../public/imgs')
    this.fileUpload = new Uploader(imageDir)
  }

  async upload(file) {
    try {
      const type = file.mimetype.split('/')[1]
      const filename = await this.fileUpload.save(file.buffer, type)
      const imageId = await Repository.save({filename, mimetype: type})
      return {id: imageId}
    } catch(err) {
      logError({ message: err, path: 'ImageController, upload, global catch' })
      throw new Error({error: err && err.message, status: err.status || 500})
    }
  }

  async uploadMulti(files) {
    try {
      const fileIDs = await Promise.all(files.map(async file => {
        const type = file.mimetype.split('/')[1]
        const filename = await this.fileUpload.save(file.buffer, type)
        const imageId = await Repository.save({filename, mimetype: type})
        return {id: imageId}
      }))
      return { data: fileIDs }
    } catch(err) {
      logError({ message: err, path: 'ImageController, uploadMulti, global catch' })
      throw new Error({error: err && err.message, status: err.status || 500})
    }
  }

}

module.exports = ImageController
const Uploader = require('../services/Uploader')
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
      return {name: filename}
    } catch(err) {
      logError({ message: err, path: 'ImageController, upload, global catch' })
    }
  }

  async uploadMulti(files) {
    try {
      const filenames = await Promise.all(files.map(async file => {
        const type = file.mimetype.split('/')[1]
        const filename = await this.fileUpload.save(file.buffer, type)
        return {name: filename}
      }))
      return { data: filenames }
    } catch(err) {
      logError({ message: err, path: 'ImageController, uploadMulti, global catch' })
    }
  }

}

module.exports = ImageController
const Uploader = require('../services/Uploader')
const Repository = require('../services/Repository')
const { logError } = require('zippy-logger')

class ImageController {

  constructor() {
    const imageDir = path.join(__dirname, '/../../public/imgs')
    this.fileUpload = new Uploader(imageDir)
  }

  async fetch(id) {
    try {
      const filename = await Repository.get(id)
      return { name: filename }
    } catch(err) {
      logError({ message: err, path: 'ImageController, fetch, global catch' })
      throw new Error({error: err && err.message, status: err.status || 500})
    }
  }

  async fetchList(ids) {
    try {

      const filenames = await Promise.all(ids.map(async id => {
        const filename = await Repository.get(id)
        return { name: filename }
      }))
      return { data: filenames }

    } catch(err) {
      logError({ message: err, path: 'ImageController, fetchList, global catch' })
      throw new Error({error: err && err.message, status: err.status || 500})
    }
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
const Uploader = require('../services/Uploader')
const Repository = require('../services/Repository')
const { logError } = require('zippy-logger')
const ErrorHandler = require('../services/ErrorHandler')
const imageSizes = require('../../configs/image-sizes')
const path = require('path')

class ImageController {

  constructor() {
    const imageDir = path.join(__dirname, '/../../public/imgs')
    this.fileUpload = new Uploader(imageDir)
  }

  async fetch(id) {
    try {
      const file = await Repository.get(id)
      return { data: file, sizes: imageSizes }
    } catch(err) {
      logError({ message: err.msg || err.message, path: 'ImageController, fetch, global catch' })
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  }

  async fetchList(ids) {
    try {
      const files = await Promise.all(ids.map(async id => {
        const file = await Repository.get(id)
        return file
      }))
      return { data: files, sizes: imageSizes }

    } catch(err) {
      logError({ message: err.msg || err.message, path: 'ImageController, fetchList, global catch' })
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  }

  async upload(file) {
    try {
      const type = file.mimetype.split('/')[1]
      const filename = await this.fileUpload.save(file.buffer, type)
      const imageId = await Repository.save({filename, mimetype: type})
      return {id: imageId}
    } catch(err) {
      logError({ message: err.msg || err.message, path: 'ImageController, upload, global catch' })
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
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
      logError({ message: err.msg || err.message, path: 'ImageController, uploadMulti, global catch' })
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  }

  async remove(id) {
    try {
      const removedFile = await Repository.remove(id)
      return removedFile
    } catch(err) {
      logError({ message: err.msg || err.message, path: 'ImageController, uploadMulti, global catch' })
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  }

}

module.exports = ImageController
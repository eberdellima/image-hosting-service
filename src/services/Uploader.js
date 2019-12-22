const { logError } = require('zippy-logger')
const sharp = require('sharp')
const uuidV4 = require('uuid/v4')
const path = require('path')
const ErrorHandler = require('./ErrorHandler')
const imageSizes = require('../../configs/image-sizes')

const sharpOpts = {
  fit: sharp.fit.inside,
  wwithoutEnlargement: true
}

const resizeOpts = imageSizes.map(size => {
  const sizes = size.split('X')
  const width = parseInt(sizes[0], 10)
  const height = parseInt(sizes[1], 10)
  return [width, height, sharpOpts]
})

class Uploader {

  constructor(source) {
    this.source = source
  }

  async save(buffer, mimeType) {
    try {
      const filename = Uploader.filename(mimeType)
      const filepath = this.filepath(filename)

      try {
        await Promise.all(resizeOpts.map(async opts => {
          const sizePath = `${filepath}_${opts[0]}X${opts[1]}.${mimeType}`
          await sharp(buffer).resize(...opts).toFile(sizePath)
        }))
      } catch(err) {
        logError({ message: err.msg || err.message, path: 'Uploader, save, image resize'})
        throw new ErrorHandler(err.msg || err.message, err.status || 500)
      }

      return filename
    } catch(err) {
      logError({ message: err.msg || err.message, path: 'Uploader, save, global catch'})
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  }

  static filename(mimeType) {
    try {
      const mimeTypes = [ 'png', 'jpg', 'jpeg' ]
      const mimeExists = mimeTypes.includes(mimeType)

      if (!mimeExists) {
        throw new ErrorHandler('Invalid mimeType', 409)
      }

      return `${uuidV4()}`
    } catch(err) {
      logError({ message: err.msg, path: 'Uploader, filename'})
      throw new ErrorHandler(err.msg, 500)
    }
  }

  filepath(filename) {
    try {
      return path.resolve(`${this.source}/${filename}`)
    } catch(err) {
      logError({ messge: err.message, path: 'Uploader, filepath'})
      throw new Error(err.message, 500)
    }
  }
}


module.exports = Uploader
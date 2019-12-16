const { logError } = require('zippy-logger')
const sharp = require('sharp')
const uuidV4 = require('uuid/v4')
const path = require('path')

class Uploader {

  constructor(source) {
    this.source = source
  }

  async save(buffer, mimeType) {
    try {
      const filename = Uploader.filename(mimeType)
      const filepath = this.filepath(filename)

      const sharpOpts = {
        fit: sharp.fit.inside,
        wwithoutEnlargement: true
      }

      const resizeOpts = [ 300, 300, sharpOpts ]  //  [TODO] specify sizes dynamically

      try {
        await sharp(buffer).resize(...resizeOpts).toFile(filepath)
      } catch(err) {
        logError({ message: err, path: 'Uploader, save, image resize'})
      }

      return filename

    } catch(err) {
      logError({ message: err, path: 'Uploader, save, global catch'})
      throw new Error({message: err, status: 500})
    }
  }

  static filename(mimeType) {
    try {
      const mimeTypes = [ 'png', 'jpg', 'jpeg' ]
      const mimeExists = mimeTypes.includes(mimeType)

      if (!mimeExists) {
        throw new Error('Invalid mimeType')
      }

      return `${uuidV4()}.${mimeType}`
    } catch(err) {
      logError({ message: err, path: 'Uploader, filename'})
      throw new Error({message: err, status: 500})
    }
  }

  filepath(filename) {
    try {
      return path.resolve(`${this.source}/${filename}`)
    } catch(err) {
      logError({ messge: err, path: 'Uploader, filepath'})
      throw new Error({message: err, status: 500})
    }
  }
}


module.exports = Uploader
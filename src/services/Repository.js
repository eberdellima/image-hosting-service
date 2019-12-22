const { db } = require('../../boot/database')
const { logError } = require('zippy-logger')
const ErrorHandler = require('./ErrorHandler')

const Repository = {
  save: async function(data) {
    try {
      const image = new db.Images({
        filename: data.filename,
        mimetype: data.mimetype,
        created_at: Date.now(),
      })

      const savedImage = await image.save()
      return savedImage.id

    } catch(err) {
      logError({message: err.message, path: 'Storer, save, global'})
      throw new ErrorHandler(err.message, 500)
    }
  },

  get: async function(id) {
    try {
      const file = await db.Images.findOne({
        where: {
          id: id,
          deleted_at: null
        }
      })

      if (!file) {
        throw new ErrorHandler('File not found!', 404)
      }
      return file

    } catch(err) {
      logError({message: err.msg || err.message, path: 'Storer, get, global'})
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  },

  remove: async function (id) {
    try {
      const file = await db.Images.findOne({
        id: id,
        deleted_at: null
      })

      if (!file) {
        throw new ErrorHandler('File not in datebase!', 404)
      }

      const updatedFile = await file.update({deleted_at: new Date.now()})
      return updatedFile

    } catch(err) {
      logError({message: err.msg || err.message, path: 'Storer, remove, global'})
      throw new ErrorHandler(err.msg || err.message, err.status || 500)
    }
  }
}

module.exports = Repository
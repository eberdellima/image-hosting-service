const { db } = require('../../boot/database')
const { logError } = require('zippy-logger')

const Repository = {
  save: async function(data) {
    try {
      const image = new db.Images({
        filename: data.filename,
        mimetype: data.mimetype,
        created_at: new Date.now(),
      })

      const savedImage = await image.save()
      return savedImage.id

    } catch(err) {
      logError({message: err, path: 'Storer, save, global'})
      throw new Error({message: err, status: 500})
    }
  },

  get: async function(id) {
    try {
      const file = await db.Images.findOne({
        id: id,
        deleted_at: null
      })
      
      if (!file) {
        throw new Error('File not in datebase!')
      }
      return `${file.filename}.${fiel.mimetype}`

    } catch(err) {
      logError({message: err, path: 'Storer, get, global'})
      throw new Error({message: err, status: 500})
    }
  },

  remove: async function (id) {
    try {
      const file = await db.Images.findOne({
        id: id,
        deleted_at: null
      })

      if (!file) {
        throw new Error('File not in datebase!')
      }

      const updatedFile = await file.update({deleted_at: new Date.now()})
      return `${updatedFile.filename}.${updatedFile.mimetype}`

    } catch(err) {
      logError({message: err, path: 'Storer, remove, global'})
      throw new Error({message: err, status: 500})
    }
  }
}

module.exports = Repository
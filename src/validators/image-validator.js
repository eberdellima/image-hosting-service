const ErrorHandler = require('../services/ErrorHandler')
const { logError } = require('zippy-logger')
const Joi = require('@hapi/joi')

const types = [
  'image/png',
  'image/jpg',
  'image/jpeg'
]

class ImageValidator {

  static async single (req, res, next) {
    try {
      const file = req.file
      if (!file) {
        res.status(408).send({error: 'No file received!'})
        return
      }

      const {mimetype, size, fieldname} = file
      const fileData = {fieldname, mimetype, size}

      const schema = Joi.object({
        fieldname: Joi.string().valid('image'),
        mimetype: Joi.string().valid(...types),
        size: Joi.number().less(800000) //  Max size 800 Kb
      })

      await ImageValidator.validate(schema, fileData)
      next()
    } catch(err) {
      logError({message: 'Schema validation failed', path: 'ImageValidator, single'})
      res.status(err.status || 408).send({error: err.msg || err.message})
    }
  }

  static async multi (req, res, next) {
    try {
      const files = req.files

      if (!files || files.length === 0) {
        res.status(408).send({error: 'No file received!'})
        return
      }

      const filesData = files.map(file => {
        const {mimetype, fieldname, size} = file
        return {fieldname, mimetype, size}
      })

      const schema = Joi.array().items(
        Joi.object({
          fieldname: Joi.string().valid('image'),
          mimetype: Joi.string().valid(...types),
          size: Joi.number().less(800000) //  Max size 800 Kb
        })
      )

      await ImageValidator.validate(schema, filesData)
      next()
    } catch(err) {
      logError({message: 'Schema validation failed', path: 'ImageValidator, multi'})
      res.status(err.status || 408).send({error: err.msg || err.message})
    }
  }

  static async validate (schema, value) {
    try {
      const result = await schema.validateAsync(value)
    } catch(err) {
     throw new ErrorHandler('Invalid file', 408) 
    }
  }
}

module.exports = ImageValidator
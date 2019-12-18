const router = require('express').Router()
const upload = require('../middlewares/uploadMiddleware')
const ImageController = require('../controllers/image-controller')
const { logError } = require('zippy-logger')


router.post('/singleImage', upload.single('image'), async (req, res) => {
  try {
    const imageController = new ImageController()

    if (!req.file) {
      res.status(401).send({ error: 'Image not provided!' })
    }

    const result = await imageController.upload(req.file)
    res.status(200).send(result)

  } catch (err) {
    logError({ message: err, path: 'Index routes, singleImage, POST ' })
    res.status(500).send({error: err.message})
  }
})

router.post('/multiImage', upload.array('image', 10), async (req, res) => {
  try {
    const imageController = new ImageController()

    if (!req.files) {
      res.status(401).send({ error: 'Image not provided!' })
    }

    const result = await imageController.uploadMulti(req.files)
    res.status(200).send(result)

  } catch (err) {
    logError({ message: err, path: 'Index routes, multiImage, POST' })
    res.status(500).send({error: err.message})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)

    if (isNaN(id)) {
      res.status(409).send('Invalid id!')
    }

    const imageController = new ImageController()
    const result = await imageController.fetch(id)
    res.status(200).send(result)

  } catch (err) {
    logError({ message: err, path: 'Index routes, id, GET' })
    res.status(500).send({error: err.message})
  }
})

router.get('/', async (req, res) => {
  try {
    const ids = req.query.ids

    if (!ids || ids.length === 0)
      return res.status(200).send({})

    if (typeof ids === 'string') {
      ids = [ids]
    }

    const imageController = new ImageController()
    const result = await imageController.fetchList(ids)
    res.status(200).send(result)

  } catch (err) {
    logError({ message: err, path: 'Index routes, id, GET' })
    res.status(500).send({error: err.message})
  }
})

module.exports = router
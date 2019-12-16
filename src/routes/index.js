const router = require('express').Router()
const upload = require('../middlewares/uploadMiddleware')
const ImageController = require('../controllers/image-controller')
const { logError } = require('zippy-logger')


router.post('/singleImage', upload.single('image'), async (req, res) => {
  try {
    const imageController = new ImageController()
    
    if (!req.file) {
      res.status(401).send({error: 'Image not provided!'})
    }

    const result = await imageController.upload(req.file)
    res.status(200).send(result)

  } catch(err) {
    logError({ message: err, path: 'Index routes, singleImage, POST '} )
    res.status(err.status).send(err)
  }
})

router.post('/multiImage', upload.array('image', 10), async (req, res) => {
  try {
    const imageController = new ImageController()

    if (!req.files) {
      res.status(401).send({error: 'Image not provided!'})
    }

    const result = await imageController.uploadMulti(req.files)
    res.status(200).send(result)

  } catch(err) {
    logError({ message: err, path: 'Index routes, multiImage, POST'})
    res.status(err.status).send(err)
  }
})

module.exports = router
const router = require('express').Router()
const upload = require('../middlewares/uploadMiddleware')
const Uploader = require('../controllers/Uploader')
const path = require('path')
const { logError } = require('zippy-logger')


router.post('/singleImage', upload.single('image'), async (req, res) => {
  try {
    const imageDir = path.join(__dirname, '/../../public/imgs')
    const fileUpload = new Uploader(imageDir)
    
    if (!req.file) {
      res.status(401).send({error: 'Image not provided!'})
    }
  
    const type = req.file.mimetype.split('/')[1]
    const filename = await fileUpload.save(req.file.buffer, type)
    res.status(200).send({ name: filename })

  } catch(err) {
    logError({ message: err, path: 'Index routes, singleImage, POST '} )
  }
})

router.post('/multiImage', upload.array('image', 10), async (req, res) => {  // [TODO] make possible for multiple file uploads
  try {
    const imageDir = path.join(__dirname, '/../../public/imgs')
    const fileUpload = new Uploader(imageDir)

    if (!req.files) {
      res.status(401).send({error: 'Image not provided!'})
    }

    const files = await Promise.all(req.files.map(async file => {
      const data = file.buffer
      const type = file.mimetype.split('/')[1]
      const filename = await fileUpload.save(data, type)
      return { "name": filename }
    }))
    res.status(200).send({ data: files })

  } catch(err) {
    logError({ message: err, path: 'Index routes, multiImage, POST'})
  }
})

module.exports = router
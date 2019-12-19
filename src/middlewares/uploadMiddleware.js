const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${__dirname}/../../public/tmp`)
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}`)
//   }
// })

const limits = { fileSize: 4 * 1024 * 1024 }
// const upload = multer({ limits, storage }) [OPTIONAL] if you create a storage, multer will take care of writing the file
const upload = multer({limits}) //  Be choosing not to create a storage I will only handle the buffer without making extra r/w operations

module.exports = upload
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { uploadFile, getUpload } = require('../controllers/uploadsController')

const UPLOADS_DIR = process.env.UPLOADS_DIR || 'uploads'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const name = `${Date.now()}_${Math.random().toString(36).slice(2,8)}${ext}`
    cb(null, name)
  }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), uploadFile)
router.get('/:id', getUpload)

module.exports = router

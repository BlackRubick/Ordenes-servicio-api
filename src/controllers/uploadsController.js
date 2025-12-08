const path = require('path')
const fs = require('fs')
const { Upload } = require('../models')

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file' })
    const ordenId = req.body.ordenId || null
    const filename = req.file.filename
    const filePath = path.join(process.env.UPLOADS_DIR || 'uploads', filename)
    const rec = await Upload.create({ ordenId, filename, path: filePath })
    res.status(201).json(rec)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const getUpload = async (req, res) => {
  try {
    const rec = await Upload.findByPk(req.params.id)
    if (!rec) return res.status(404).json({ message: 'Not found' })
    const absolute = path.resolve(rec.path)
    if (!fs.existsSync(absolute)) return res.status(404).json({ message: 'File missing' })
    res.sendFile(absolute)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { uploadFile, getUpload }

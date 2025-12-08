const { Technician } = require('../models')
const bcrypt = require('bcryptjs')

const list = async (req, res) => {
  try {
    const techs = await Technician.findAll({ where: { activo: true } })
    res.json(techs)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const getByUid = async (req, res) => {
  try {
    const t = await Technician.findOne({ where: { uid: req.params.uid } })
    if (!t) return res.status(404).json({ message: 'Not found' })
    res.json(t)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const create = async (req, res) => {
  try {
    const { uid, nombre, email, password, rol = 'tecnico', activo = true } = req.body
    const hashed = password ? await bcrypt.hash(password, 10) : null
    const newUid = uid || `${rol}_${Date.now().toString().slice(-6)}`
    const t = await Technician.create({ uid: newUid, nombre, email, password: hashed, rol, activo })
    res.status(201).json(t)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { list, getByUid, create }

const { Technician, User } = require('../models')

const normalizeUser = (u) => ({
  id: u.id,
  uid: u.uid || `user-${u.id}`,
  nombre: u.name || u.nombre || u.email,
  email: u.email,
  rol: u.role || u.rol || 'admin',
  source: 'user'
})

const normalizeTech = (t) => ({
  id: t.id,
  uid: t.uid,
  nombre: t.nombre,
  email: t.email,
  rol: t.rol || 'tecnico',
  source: 'technician',
  activo: t.activo
})

const deleteUserByUid = async (uid) => {
  // technicians identified by uid
  const tech = await Technician.findOne({ where: { uid } })
  if (tech) { await tech.destroy(); return { deletedFrom: 'technician', id: tech.id } }
  // users encoded as user-<id>
  if (uid && uid.startsWith('user-')) {
    const id = Number(uid.replace('user-',''))
    if (!Number.isNaN(id)) {
      const user = await User.findByPk(id)
      if (user) { await user.destroy(); return { deletedFrom: 'user', id: user.id } }
    }
  }
  return null
}

const updateUserByUid = async (uid, data) => {
  // Update technician by uid
  const tech = await Technician.findOne({ where: { uid } })
  if (tech) {
    await tech.update({
      nombre: data.nombre ?? tech.nombre,
      email: data.email ?? tech.email,
      rol: data.rol ?? tech.rol,
      activo: typeof data.activo === 'boolean' ? data.activo : tech.activo
    })
    return { updatedIn: 'technician', record: tech }
  }
  // Update user encoded as user-<id>
  if (uid && uid.startsWith('user-')) {
    const id = Number(uid.replace('user-',''))
    if (!Number.isNaN(id)) {
      const user = await User.findByPk(id)
      if (user) {
        await user.update({
          name: data.nombre ?? user.name,
          email: data.email ?? user.email,
          role: data.rol ?? user.role
        })
        return { updatedIn: 'user', record: user }
      }
    }
  }
  return null
}

const getUsers = async (req, res) => {
  try {
    const [users, techs] = await Promise.all([
      User.findAll(),
      Technician.findAll()
    ])
    const all = [
      ...users.map(normalizeUser),
      ...techs.map(normalizeTech)
    ]
    res.json(all)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const findByUid = async (req, res) => {
  try {
    const uid = req.params.uid
    // Try technician by uid
    const t = await Technician.findOne({ where: { uid } })
    if (t) return res.json(normalizeTech(t))
    // Try user by id encoded in uid
    if (uid && uid.startsWith('user-')) {
      const id = Number(uid.replace('user-',''))
      if (!Number.isNaN(id)) {
        const u = await User.findByPk(id)
        if (u) return res.json(normalizeUser(u))
      }
    }
    return res.status(404).json({ message: 'Not found' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const remove = async (req, res) => {
  try {
    const uid = req.params.uid
    const result = await deleteUserByUid(uid)
    if (!result) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted', ...result })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const update = async (req, res) => {
  try {
    const uid = req.params.uid
    const result = await updateUserByUid(uid, req.body || {})
    if (!result) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Updated', ...result })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getUsers, findByUid, remove, update, updateUserByUid }

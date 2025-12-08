const { Order, User, Technician } = require('../models')

const createOrder = async (req, res) => {
  try {
    const { folio } = req.body
    if (!folio) return res.status(400).json({ message: 'Folio requerido' })

    const exist = await Order.findOne({ where: { folio } })
    if (exist) return res.status(400).json({ message: 'Folio ya existe' })

    const order = await Order.create({ ...req.body, userId: req.user?.id })
    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const listOrders = async (req, res) => {
  try {
    const where = {}
    if (req.user?.role === 'tecnico' && req.user?.uid) {
      where.tecnicoUid = req.user.uid
    }
    const orders = await Order.findAll({ where, include: [{ model: User, as: 'user', attributes: ['id','name','email'] }, { model: Technician, as: 'tecnico', attributes: ['id','uid','nombre','email'] }] })
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findByPk(id, { include: [{ model: User, as: 'user', attributes: ['id','name','email'] }, { model: Technician, as: 'tecnico', attributes: ['id','uid','nombre','email'] }] })
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' })
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findByPk(id)
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' })

    // avoid folio collision
    if (req.body.folio && req.body.folio !== order.folio) {
      const exist = await Order.findOne({ where: { folio: req.body.folio } })
      if (exist) return res.status(400).json({ message: 'Folio ya existe' })
    }

    await order.update(req.body)
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findByPk(id)
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' })

    await order.destroy()
    res.json({ message: 'Orden eliminada' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getByFolioPublic = async (req, res) => {
  try {
    const { folio } = req.params
    if (!folio) return res.status(400).json({ message: 'Folio requerido' })
    const order = await Order.findOne({ 
      where: { folio },
      include: [
        { model: User, as: 'user', attributes: ['id','name','email'] },
        { model: Technician, as: 'tecnico', attributes: ['id','uid','nombre','email'] }
      ]
    })
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' })
    return res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { createOrder, listOrders, getOrder, updateOrder, deleteOrder, getByFolioPublic }

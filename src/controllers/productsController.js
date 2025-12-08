const { Product } = require('../models')

const list = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const getOne = async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json(p)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const create = async (req, res) => {
  try {
    const { name, sku, price, stock } = req.body
    const created = await Product.create({ name, sku, price, stock })
    res.status(201).json(created)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const update = async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    await p.update(req.body)
    res.json(p)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

const remove = async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    await p.destroy()
    res.json({ message: 'Deleted' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { list, getOne, create, update, remove }

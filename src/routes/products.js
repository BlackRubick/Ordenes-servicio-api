const express = require('express')
const router = express.Router()
const { list, getOne, create, update, remove } = require('../controllers/productsController')
const auth = require('../middleware/auth')

router.get('/', auth, list)
router.post('/', auth, create)
router.get('/:id', auth, getOne)
router.put('/:id', auth, update)
router.delete('/:id', auth, remove)

module.exports = router

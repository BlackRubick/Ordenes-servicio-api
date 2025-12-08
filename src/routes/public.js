const express = require('express')
const router = express.Router()
const { getByFolioPublic } = require('../controllers/ordersController')

// Public endpoint: fetch order status by folio
router.get('/orden/:folio', getByFolioPublic)

module.exports = router

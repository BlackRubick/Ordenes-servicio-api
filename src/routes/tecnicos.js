const express = require('express')
const router = express.Router()
const { list, getByUid, create } = require('../controllers/techniciansController')
const auth = require('../middleware/auth')

router.get('/', auth, list)
router.post('/', auth, create)
router.get('/:uid', auth, getByUid)

module.exports = router

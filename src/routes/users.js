const express = require('express')
const router = express.Router()
const { getUsers, findByUid, remove, updateUserByUid } = require('../controllers/usersController')
const auth = require('../middleware/auth')

router.get('/', auth, getUsers)
router.get('/:uid', auth, findByUid)
router.put('/:uid', auth, updateUserByUid)
router.delete('/:uid', auth, remove)

module.exports = router

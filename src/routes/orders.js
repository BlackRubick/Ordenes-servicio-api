const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createOrder,
  listOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  listDeletedOrders,
  restoreOrder
} = require('../controllers/ordersController');

router.get('/', auth, listOrders);
router.get('/eliminadas', auth, listDeletedOrders);
router.post('/', auth, createOrder);
router.get('/:id', auth, getOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);
router.post('/:id/restore', auth, restoreOrder);

module.exports = router;

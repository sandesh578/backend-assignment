const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getAllOrders
} = require('../controllers/orderController');

router.get('/all', getAllOrders);
router.post('/', authMiddleware, createOrder);
router.put('/:id', authMiddleware, updateOrder);
router.delete('/:id', authMiddleware, deleteOrder);
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;

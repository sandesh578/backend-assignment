const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getAllOrders
} = require('../controllers/orderController');

router.get('/all', getAllOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/:id', getOrderById);

module.exports = router;

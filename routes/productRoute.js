const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getProductById,
  getProductByName,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts
} = require('../controllers/productController');

router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.get('/', getProductByName);
router.post('/', authMiddleware, createProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, updateProduct);

module.exports = router;

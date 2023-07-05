const express = require('express');
const router = express.Router();
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
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;

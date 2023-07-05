const express = require('express');
const router = express.Router();

const {
  generateDailySalesReport,
  generateWeeklySalesReport,
  generateMonthlySalesReport,
  generateTopSellingProductsReport
} = require('../controllers/reportController');

router.get('/daily', generateDailySalesReport);
router.get('/weekly', generateWeeklySalesReport);
router.get('/monthly', generateMonthlySalesReport);
router.get('/top-selling-products', generateTopSellingProductsReport);

module.exports = router;

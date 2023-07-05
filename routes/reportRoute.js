const express = require('express');
const router = express.Router();

const {
  generateDailySalesReport,
  generateWeeklySalesReport,
  generateMonthlySalesReport,
  generateTopSellingProductsReport
} = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API endpoints for reporting
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DailySalesReportResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         totalSales:
 *           type: number
 *
 *     WeeklySalesReportResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         week:
 *           type: integer
 *         year:
 *           type: integer
 *         totalSales:
 *           type: number
 *
 *     MonthlySalesReportResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         month:
 *           type: integer
 *         year:
 *           type: integer
 *         totalSales:
 *           type: number
 *
 *     TopSellingProductsReportResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         topSellingProducts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               _sum:
 *                 type: object
 *                 properties:
 *                   quantity:
 *                     type: number
 */

/**
 * @swagger
 * /reports/daily:
 *   get:
 *     summary: Generate daily sales report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         description: Date in ISO format (YYYY-MM-DD)
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailySalesReportResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/daily', generateDailySalesReport);

/**
 * @swagger
 * /reports/weekly:
 *   get:
 *     summary: Generate weekly sales report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: week
 *         description: Week number (1-52)
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year
 *         description: Year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeeklySalesReportResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/weekly', generateWeeklySalesReport);

/**
 * @swagger
 * /reports/monthly:
 *   get:
 *     summary: Generate monthly sales report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: month
 *         description: Month number (1-12)
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year
 *         description: Year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MonthlySalesReportResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/monthly', generateMonthlySalesReport);

/**
 * @swagger
 * /reports/top-selling-products:
 *   get:
 *     summary: Generate top selling products report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Maximum number of top selling products to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopSellingProductsReportResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/top-selling-products', generateTopSellingProductsReport);

module.exports = router;

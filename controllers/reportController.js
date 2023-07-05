const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const generateDailySalesReport = async (req, res) => {
  try {
    const { date } = req.query;

    const formattedDate = new Date(date);

    const startOfDay = new Date(
      formattedDate.getFullYear(),
      formattedDate.getMonth(),
      formattedDate.getDate()
    );
    const endOfDay = new Date(
      formattedDate.getFullYear(),
      formattedDate.getMonth(),
      formattedDate.getDate() + 1
    );

    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Daily sales report generated successfully',
      date: formattedDate.toISOString().split('T')[0],
      totalSales: totalSales._sum.totalAmount || 0
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate daily sales report',
      error: err.message
    });
  }
};

const generateWeeklySalesReport = async (req, res) => {
  try {
    const { week, year } = req.query;

    const startOfWeek = new Date(year, 0, 1 + (week - 1) * 7);
    const endOfWeek = new Date(year, 0, 1 + (week - 1) * 7 + 7);

    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: startOfWeek,
          lt: endOfWeek
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Weekly sales report generated successfully',
      week,
      year,
      totalSales: totalSales._sum.totalAmount || 0
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate weekly sales report',
      error: err.message
    });
  }
};

const generateMonthlySalesReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Monthly sales report generated successfully',
      month,
      year,
      totalSales: totalSales._sum.totalAmount || 0
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate monthly sales report',
      error: err.message
    });
  }
};

const generateTopSellingProductsReport = async (req, res) => {
  try {
    const { limit } = req.query;

    const topSellingProducts = await prisma.order.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: parseInt(limit)
    });

    res.status(200).json({
      success: true,
      message: 'Top selling products report generated successfully',
      topSellingProducts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate top selling products report',
      error: err.message
    });
  }
};

module.exports = {
  generateDailySalesReport,
  generateWeeklySalesReport,
  generateMonthlySalesReport,
  generateTopSellingProductsReport
};

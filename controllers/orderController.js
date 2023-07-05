const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllOrders = async (req, res) => {
  try {
    const { page, limit, filters } = req.query;

    //Set default page and limit values
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    // Parse filters if provided
    let parsedFilters = {};
    if (filters) {
      parsedFilters = JSON.parse(filters);
    }

    // Calculate skip and take values for pagination
    const skip = (pageNumber - 1) * pageSize;
    const take = parseInt(pageSize);

    // Apply pagination and filtering to the query
    const orders = await prisma.order.findMany({
      skip,
      take,
      where: parsedFilters
    });

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      orders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: err.message
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = req.body;

    const createdOrder = await prisma.order.create({
      data: order
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: createdOrder
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: err.message
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;

    const order = await prisma.order.update({
      where: {
        id: id
      },
      data: updatedOrder
    });

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order: order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: err.message
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: {
        id: id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: err.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: err.message
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getAllOrders
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: err.message
    });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await prisma.product.findMany({
      where: {
        name: name
      }
    });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;

    const createdProduct = await prisma.product.create({
      data: product
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: createdProduct
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: err.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: err.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    const product = await prisma.product.update({
      where: {
        id: id
      },
      data: updatedProduct
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: err.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;

    // Set default page and limit values
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * pageSize;

    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    let match = {};
    const products = await prisma.product.findMany({
      skip: offset,
      take: pageSize,
      where: match
    });

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products: products,
      page: pageNumber,
      totalPages: totalPages,
      totalCount: totalCount
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message
    });
  }
};

module.exports = {
  getProductById,
  getProductByName,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    // Get page, limit and filter params
    const { page, limit, name } = req.query;

    // Set default page and limit
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    // Calculate offset for pagination
    const offset = (pageNumber - 1) * pageSize;

    // Build match condition based on name filter
    let match = {};
    if (name) {
      match = {
        username: {
          contains: name
        }
      };
    }

    const users = await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: match,
      orderBy: {
        username: 'asc'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: err.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email: req.body.email }
    });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists.'
      });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: err.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return response(res, 404, 'User not found');
    }

    response(res, 200, 'User fetched successfully', { user });
  } catch (err) {
    if (err.code === 'P2002') {
      return response(res, 400, 'Invalid user ID');
    }

    response(res, 500, 'Failed to fetch user');
  }
};

const response = (res, status, message, data) => {
  res.status(status).json({
    success: status < 400,
    message,
    data
  });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email
      }
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (err) {
    if (err.code === 'P2002') {
      res.status(400).json({
        success: false,
        message: 'User does not exist'
      });
    }

    if (err.constraint === 'users_email_key') {
      res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      deletedUser
    });
  } catch (err) {
    if (err.code === 'P2002') {
      res.status(400).json({
        success: false,
        message: 'User does not exist'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

const { catchErrors } = require('../utils/custom-helpers');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { decrypt, encrypt } = require('../crypto/fileCrypto');
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .message(
      'Password must contain a symbol, an uppercase alphabet, a number, and length should be between 6 and 16.'
    )
    .required()
});

const loginUser = catchErrors(async (req, res, next) => {
  const validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
  }

  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User is not registered. Please register and try again.'
    });
  }

  if (!(await decrypt(user.password, req.body.password))) {
    return res.status(400).json({
      success: false,
      message: 'Password is incorrect.'
    });
  }

  const accessToken = jwt.sign({ id: user.id }, SECRET_ACCESS_TOKEN, {
    expiresIn: '5d'
  });

  const { password, ...userInfo } = user;

  res.status(200).json({
    success: true,
    message: 'Logged in successfully.',
    accessToken,
    user: userInfo
  });
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .message(
      'Password must contain a symbol, an uppercase alphabet, a number, and length should be between 6 and 16.'
    )
    .required()
});

const registerUser = catchErrors(async (req, res, next) => {
  const validation = registerSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
  }

  const userExists = await prisma.user.findUnique({
    where: { email: req.body.email }
  });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists.'
    });
  }

  const hashedPassword = await encrypt(req.body.password);
  const savedUser = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }
  });

  if (!savedUser) {
    return res.status(500).json({
      success: false,
      message: 'User registration failed.'
    });
  }

  const { password, ...userInfo } = savedUser;

  res.status(200).json({
    success: true,
    message: 'User registered successfully.',
    user: userInfo
  });
});

module.exports = {
  registerUser,
  loginUser
};

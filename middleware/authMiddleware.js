const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;

// Middleware function for authorization
const authMiddleware = async (req, res, next) => {
  try {
    // Get the access token from the request headers
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ message: 'Access token not found.' });
    }

    // Verify the access token
    const decodedToken = jwt.verify(accessToken, SECRET_ACCESS_TOKEN);

    // Retrieve the user from the database based on the token information
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id }
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid access token.' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid access token.' });
  }
};

module.exports = { authMiddleware };

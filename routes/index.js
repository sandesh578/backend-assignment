const express = require('express');
const app = express();

// Importing routes
const userRoute = require('./userRoute');
const orderRoute = require('./orderRoute');
const productRoute = require('./productRoute');
const reportRoute = require('./reportRoute');
const authRoute = require('./authRoute');

// Registering routes
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);
app.use('/products', productRoute);
app.use('/reports', reportRoute);

module.exports = app;

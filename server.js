const path = require('path');
const express = require('express');
const cors = require('cors');
const log4js = require('log4js');

const logger = log4js.getLogger(path.basename(__filename).split('.')[0]);
const BACKEND_API_PORT = process.env.BACKEND_API_PORT;

logger.info('Initializing server');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(BACKEND_API_PORT, () => {
  logger.info(`Server listening on port: ${BACKEND_API_PORT}`);
});

module.exports = { app, server };

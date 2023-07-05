const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const path = require('path');
const log4js = require('log4js');

const DEFAULT_LOG_LEVEL = process.env.DEFAULT_LOG_LEVEL;
const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
  log4js.configure({
    appenders: {
      file: {
        type: 'file',
        filename: `logs/${path.basename(__filename).split('.')[0]}.log`
      },
      console: { type: 'console' }
    },
    categories: {
      default: {
        appenders: ['file', 'console'],
        level: DEFAULT_LOG_LEVEL
      }
    }
  });
}

const { app, server } = require('./server');
const prismClient = require('./utils/connect2db');
const gracefulTermination = require('./gracefulExit');

// importing routes
const APIRouters = require('./routes');

//establishing db connection
prismClient.connectDb();

// routers
app.use('/', APIRouters);

// global error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.error(err);

  // render the error message
  res.status(err.status || 500);
  const response = {
    message: (err.data && err.data.message) || 'Internal server error',
    status: err.status || 500
  };

  res.send(response);
});

// graceful termination of process
process.on('SIGTERM', (error) => gracefulTermination(error, server));
process.on('SIGINT', (error) => gracefulTermination(error, server));
process.on('uncaughtException', (error) => gracefulTermination(error, server));
process.on('unhandledRejection', (error) => gracefulTermination(error, server));

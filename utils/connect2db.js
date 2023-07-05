const { PrismaClient } = require('@prisma/client');
const log4js = require('log4js');
const logger = log4js.getLogger('connect2db');

const prisma = new PrismaClient();

async function connectDb() {
  try {
    await prisma.$connect();
    logger.info('Connected to database');
  } catch (err) {
    logger.error(`Unable to connect to database: ${err.message}`);
    throw new Error(err);
  }
}

async function getDb() {
  console.log(prisma);
  return prisma;
}

async function closeDB() {
  await prisma.$disconnect();
}

module.exports = {
  getDb,
  connectDb,
  closeDB
};

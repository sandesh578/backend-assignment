const chai = require('chai');
const chaiHttp = require('chai-http');
const { PrismaClient } = require('@prisma/client');
const { app } = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Sales Report API', () => {
  let prisma;

  before(async () => {
    prisma = new PrismaClient();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  describe('GET /reports/daily', () => {
    it('should generate a daily sales report', async () => {
      const date = '2023-07-06';

      const res = await chai.request(app).get('/reports/daily').query({ date });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success').to.equal(true);
      expect(res.body)
        .to.have.property('message')
        .to.equal('Daily sales report generated successfully');
      expect(res.body).to.have.property('date').to.equal(date);
      expect(res.body).to.have.property('totalSales');
    });
  });

  describe('GET /reports/weekly', () => {
    it('should generate a weekly sales report', async () => {
      const week = '27';
      const year = '2023';

      const res = await chai
        .request(app)
        .get('/reports/weekly')
        .query({ week, year });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success').to.equal(true);
      expect(res.body)
        .to.have.property('message')
        .to.equal('Weekly sales report generated successfully');
      expect(res.body).to.have.property('week').to.equal(week);
      expect(res.body).to.have.property('year').to.equal(year);
      expect(res.body).to.have.property('totalSales');
    });
  });

  describe('GET /reports/monthly', () => {
    it('should generate a monthly sales report', async () => {
      const month = '7';
      const year = '2023';

      const res = await chai
        .request(app)
        .get('/reports/monthly')
        .query({ month, year });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success').to.equal(true);
      expect(res.body)
        .to.have.property('message')
        .to.equal('Monthly sales report generated successfully');
      expect(res.body).to.have.property('month').to.equal(month);
      expect(res.body).to.have.property('year').to.equal(year);
      expect(res.body).to.have.property('totalSales');
    });
  });

  describe('GET /reports/top-selling-products', () => {
    it('should generate a top selling products report', async () => {
      const limit = '10';

      const res = await chai
        .request(app)
        .get('/reports/top-selling-products')
        .query({ limit });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success').to.equal(true);
      expect(res.body)
        .to.have.property('message')
        .to.equal('Top selling products report generated successfully');
      expect(res.body).to.have.property('topSellingProducts').to.be.an('array');
    });
  });
});

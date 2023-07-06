const chai = require('chai');
const chaiHttp = require('chai-http');
const { PrismaClient } = require('@prisma/client');
const { app } = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  let prisma;

  before(async () => {
    prisma = new PrismaClient();
    //if test user already exists deleting them
    const deletedUser = await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            'testuser1@example.com',
            'testuser2@example.com',
            'testuser3@example.com'
          ]
        }
      }
    });
    console.log(`${deletedUser.count} user deleted`);

    // Create some test users
    await prisma.user.createMany({
      data: [
        {
          username: 'testuser1',
          email: 'testuser1@example.com',
          password: 'P@assword1'
        },
        {
          username: 'testuser2',
          email: 'testuser2@example.com',
          password: 'P@assword2'
        },
        {
          username: 'testuser3',
          email: 'testuser3@example.com',
          password: 'P#assword3'
        }
      ]
    });
  });

  describe('GET /users/all', () => {
    it('should return all users', async () => {
      // Make a GET request to fetch all users
      const res = await chai.request(app).get('/users/all');

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success').to.equal(true);
      expect(res.body)
        .to.have.property('message')
        .to.equal('Users fetched successfully');
      expect(res.body).to.have.property('users').to.be.an('array');
      // .to.have.lengthOf(3);
    });
  });

  after(async () => {
    //delete test users
    const deletedUser = await prisma.user.deleteMany({
      where: {
        email: {
          in: ['user1@example.com', 'user1@example.com', 'user1@example.com']
        }
      }
    });
    console.log(`${(await deletedUser).count} user deleted`);
    await prisma.$disconnect();
  });
});

const { expect } = require('chai');
const { registerUser, loginUser } = require('../controllers/authController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { encrypt, decrypt } = require('../crypto/fileCrypto');

describe('Authentication API', () => {
  const email = 'test1234@gmail.com';
  let testEmail = 'testuserlogin@example.com';
  describe('registerUser', () => {
    it('should register a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: email,
          password: 'Test#1234'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(200);
            expect(data.success).to.be.true;
            expect(data.user).to.be.an('object');
            expect(data.message).to.equal('User registered successfully.');
          }
        })
      };

      await registerUser(req, res);
      const user = await prisma.user.findUnique({
        where: { email: req.body.email }
      });

      expect(user).to.exist;
      expect(user.username).to.equal(req.body.username);
      expect(user.email).to.equal(req.body.email);
      expect(await decrypt(user.password, req.body.password)).to.be.true;
    });

    it('should return an error if user already exists', async () => {
      const req = {
        body: {
          username: 'SandeshTest',
          email: email,
          password: 'Test@123'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(400);
            expect(data.success).to.be.false;
            expect(data.message).to.equal('User already exists.');
          }
        })
      };

      await registerUser(req, res);
    });

    it('should return an error if email is not valid', async () => {
      const req = {
        body: {
          username: 'SandeshTest',
          email: 'test12344123',
          password: 'Test@123'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(400);
            expect(data.message).to.equal('"email" must be a valid email');
          }
        })
      };

      await registerUser(req, res);
    });

    //deleting the sample inserted data after testing
    after(async () => {
      const deleteResult = await prisma.user.deleteMany({
        where: {
          email: email
        }
      });

      console.log(`Deleted ${deleteResult.count} user(s) with email ${email}`);
    });
  });

  describe('loginUser', () => {
    before(async () => {
      // Creating a test user
      const hashedPassword = await encrypt('Test@1234!');
      await prisma.user.create({
        data: {
          username: 'testuser',
          email: testEmail,
          password: hashedPassword
        }
      });
    });

    it('should log in an existing user', async () => {
      const req = {
        body: {
          email: testEmail,
          password: 'Test@1234!'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(200);
            expect(data.success).to.be.true;
            expect(data.user).to.be.an('object');
            expect(data.accessToken).to.exist;
            expect(data.message).to.equal('Logged in successfully.');
          }
        })
      };

      await loginUser(req, res);
    });

    it('should return an error if user is not registered', async () => {
      const req = {
        body: {
          email: 'testuser@gmail.com',
          password: 'Test123!'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(400);
            expect(data.success).to.be.false;
            expect(data.message).to.equal(
              'User is not registered. Please register and try again.'
            );
          }
        })
      };

      await loginUser(req, res);
    });

    it('should return an error if password is incorrect', async () => {
      const req = {
        body: {
          email: testEmail,
          password: 'Incorre@3!41'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(400);
            expect(data.success).to.be.false;
            expect(data.message).to.equal('Password is incorrect.');
          }
        })
      };

      await loginUser(req, res);
    });

    it('should return an error if password do not contain capital letter,symbol and size between 6 and 16', async () => {
      const req = {
        body: {
          email: testEmail,
          password: 'IncorrectPassword'
        }
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).to.equal(400);
            expect(data.message).to.equal(
              'Password must contain a symbol, an uppercase alphabet, a number, and length should be between 6 and 16.'
            );
          }
        })
      };

      await loginUser(req, res);
    });

    after(async () => {
      const deleteResult = await prisma.user.deleteMany({
        where: {
          email: testEmail
        }
      });

      console.log(
        `Deleted ${deleteResult.count} user(s) with email ${testEmail}`
      );
    });
  });
});

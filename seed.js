const { PrismaClient } = require('@prisma/client');
const { encrypt } = require('./crypto/fileCrypto');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Users
    const password = await encrypt('Password@11');
    const user1 = await prisma.user.create({
      data: {
        username: 'user13',
        email: 'user13@example.com',
        password: password
      }
    });

    const password2 = await encrypt('Password@12');
    const user2 = await prisma.user.create({
      data: {
        username: 'user21',
        email: 'user21@example.com',
        password: password2
      }
    });

    // Seed Products
    const product1 = await prisma.product.create({
      data: {
        name: 'Product 12',
        description: 'Description for Product 12',
        price: 9.99
      }
    });

    const product2 = await prisma.product.create({
      data: {
        name: 'Product 21',
        description: 'Description for Product 21',
        price: 19.99
      }
    });

    // Seed Orders
    const order1 = await prisma.order.create({
      data: {
        userId: user1.id,
        productId: product1.id,
        quantity: 2,
        totalAmount: product1.price * 2
      }
    });

    const order2 = await prisma.order.create({
      data: {
        userId: user2.id,
        productId: product2.id,
        quantity: 3,
        totalAmount: product2.price * 3
      }
    });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

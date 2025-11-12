require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-shop');
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Seed Users
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          latitude: 40.7128,
          longitude: -74.0060
        },
        isAdmin: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '0987654321',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
          latitude: 34.0522,
          longitude: -118.2437
        },
        isAdmin: false
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
        phone: '5555555555',
        address: {
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
          latitude: 41.8781,
          longitude: -87.6298
        },
        isAdmin: false
      }
    ]);

    // Seed Products
    const products = await Product.insertMany([
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 150,
        discount: 10,
        finalPrice: 135,
        quantity: 50,
        category: 'Electronics',
        inStock: true,
        rating: 4.5,
        image: 'https://via.placeholder.com/150?text=Headphones'
      },
      {
        name: 'USB-C Cable',
        description: 'Durable USB-C charging cable',
        price: 15,
        discount: 0,
        finalPrice: 15,
        quantity: 200,
        category: 'Electronics',
        inStock: true,
        rating: 4,
        image: 'https://via.placeholder.com/150?text=USB-Cable'
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 25,
        discount: 20,
        finalPrice: 20,
        quantity: 100,
        category: 'Clothing',
        inStock: true,
        rating: 4.2,
        image: 'https://via.placeholder.com/150?text=T-Shirt'
      },
      {
        name: 'JavaScript Book',
        description: 'Complete guide to JavaScript programming',
        price: 45,
        discount: 15,
        finalPrice: 38.25,
        quantity: 30,
        category: 'Books',
        inStock: true,
        rating: 4.7,
        image: 'https://via.placeholder.com/150?text=JS-Book'
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with timer',
        price: 89,
        discount: 12,
        finalPrice: 78.32,
        quantity: 25,
        category: 'Home',
        inStock: true,
        rating: 4.3,
        image: 'https://via.placeholder.com/150?text=Coffee-Maker'
      },
      {
        name: 'Running Shoes',
        description: 'Professional running shoes for athletes',
        price: 120,
        discount: 25,
        finalPrice: 90,
        quantity: 40,
        category: 'Sports',
        inStock: true,
        rating: 4.6,
        image: 'https://via.placeholder.com/150?text=Running-Shoes'
      },
      {
        name: 'Phone Case',
        description: 'Protective phone case for iPhone',
        price: 20,
        discount: 5,
        finalPrice: 19,
        quantity: 150,
        category: 'Electronics',
        inStock: true,
        rating: 3.8,
        image: 'https://via.placeholder.com/150?text=Phone-Case'
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga exercise mat',
        price: 35,
        discount: 10,
        finalPrice: 31.5,
        quantity: 60,
        category: 'Sports',
        inStock: true,
        rating: 4.4,
        image: 'https://via.placeholder.com/150?text=Yoga-Mat'
      }
    ]);

    // Seed Orders
    await Order.insertMany([
      {
        orderNumber: 'ORD-001-' + Date.now(),
        userId: users[0]._id,
        items: [
          {
            productId: products[0]._id,
            quantity: 1,
            price: 135
          },
          {
            productId: products[1]._id,
            quantity: 2,
            price: 15
          }
        ],
        subtotal: 165,
        tax: 13.2,
        totalAmount: 178.2,
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          latitude: 40.7128,
          longitude: -74.0060
        },
        status: 'Delivered',
        paymentStatus: true,
        isPriority: false,
        deliveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        orderNumber: 'ORD-002-' + Date.now(),
        userId: users[1]._id,
        items: [
          {
            productId: products[2]._id,
            quantity: 3,
            price: 20
          }
        ],
        subtotal: 60,
        tax: 4.8,
        totalAmount: 64.8,
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
          latitude: 34.0522,
          longitude: -118.2437
        },
        status: 'Shipped',
        paymentStatus: true,
        isPriority: true
      },
      {
        orderNumber: 'ORD-003-' + Date.now(),
        userId: users[2]._id,
        items: [
          {
            productId: products[4]._id,
            quantity: 1,
            price: 78.32
          },
          {
            productId: products[5]._id,
            quantity: 1,
            price: 90
          }
        ],
        subtotal: 168.32,
        tax: 13.47,
        totalAmount: 181.79,
        shippingAddress: {
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
          latitude: 41.8781,
          longitude: -87.6298
        },
        status: 'Processing',
        paymentStatus: true,
        isPriority: false
      },
      {
        orderNumber: 'ORD-004-' + Date.now(),
        userId: users[0]._id,
        items: [
          {
            productId: products[3]._id,
            quantity: 1,
            price: 38.25
          }
        ],
        subtotal: 38.25,
        tax: 3.06,
        totalAmount: 41.31,
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          latitude: 40.7128,
          longitude: -74.0060
        },
        status: 'Pending',
        paymentStatus: false,
        isPriority: true
      },
      {
        orderNumber: 'ORD-005-' + Date.now(),
        userId: users[1]._id,
        items: [
          {
            productId: products[6]._id,
            quantity: 2,
            price: 19
          },
          {
            productId: products[7]._id,
            quantity: 1,
            price: 31.5
          }
        ],
        subtotal: 69.5,
        tax: 5.56,
        totalAmount: 75.06,
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
          latitude: 34.0522,
          longitude: -118.2437
        },
        status: 'Delivered',
        paymentStatus: true,
        isPriority: false,
        deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]);

    console.log('Database seeded successfully!');
    console.log(`✓ ${users.length} users created`);
    console.log(`✓ ${products.length} products created`);
    console.log(`✓ 5 orders created`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seedDatabase();
  await mongoose.disconnect();
  console.log('Seeding complete and connection closed');
};

run();

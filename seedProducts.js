require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: 'Organic Apples',
    price: 120,
    category: 'Fruits',
    image: 'https://picsum.photos/300/200?random=1',
    stock: 50
  },
  {
    name: 'Fresh Bananas',
    price: 60,
    category: 'Fruits',
    image: 'https://picsum.photos/300/200?random=2',
    stock: 30
  },
  {
    name: 'Fresh Carrots',
    price: 40,
    category: 'Vegetables',
    image: 'https://picsum.photos/300/200?random=3',
    stock: 60
  },
  {
    name: 'Whole Milk',
    price: 60,
    category: 'Dairy',
    image: 'https://picsum.photos/300/200?random=4',
    stock: 100
  },
  {
    name: 'Fresh Bread',
    price: 40,
    category: 'Bakery',
    image: 'https://picsum.photos/300/200?random=5',
    stock: 30
  },
  {
    name: 'Chicken Breast',
    price: 250,
    category: 'Meat',
    image: 'https://picsum.photos/300/200?random=6',
    stock: 25
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
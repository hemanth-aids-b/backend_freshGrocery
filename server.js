require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const cartRoutes = require('./routers/cartRoutes');
const orderRoutes = require('./routers/orderRoutes');
const categoryRoutes = require('./routers/categoryRoutes');
const adminRoutes = require('./routers/adminRoutes');

const { verifyAdmin } = require('./middleware/authMiddleware'); // import admin middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://hemanth-ecommerce-shopping.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Product routes with admin verification applied inside productRoutes where necessary
app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Grocery Backend API is running'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

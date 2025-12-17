// backend/routers/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User'); // your user model
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    const order = await Order.create({ user: userId, products, totalPrice });
    
    // Optional: clear user cart
    await User.findByIdAndUpdate(userId, { cart: [] });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

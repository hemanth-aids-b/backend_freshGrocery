const User = require('../models/User');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', data: errors.array() });

    const { userId, productId, quantity = 1 } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const existingItem = user.cart.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate('cart.product');

    res.json({ success: true, message: 'Item added to cart', data: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', data: error.message });
  }
};

// Decrement item quantity in cart
const decrementFromCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', data: errors.array() });

    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const existingItem = user.cart.find(item => item.product.toString() === productId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
      }
    }

    await user.save();
    await user.populate('cart.product');

    res.json({ success: true, message: 'Item decremented from cart', data: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', data: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', data: errors.array() });

    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();
    await user.populate('cart.product');

    res.json({ success: true, message: 'Item removed from cart', data: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', data: error.message });
  }
};

// Get user cart
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('cart.product');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'Cart fetched successfully', data: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', data: error.message });
  }
};

module.exports = { addToCart, decrementFromCart, removeFromCart, getCartItems };

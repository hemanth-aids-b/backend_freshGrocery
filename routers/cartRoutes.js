const express = require('express');
const { body } = require('express-validator');
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cartController');

const router = express.Router();

// Add to cart
router.post('/add', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').optional().isNumeric().withMessage('Quantity must be a number')
], addToCart);

// Remove from cart
router.post('/remove', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('productId').notEmpty().withMessage('Product ID is required')
], removeFromCart);

// Get user cart
router.get('/:userId', getCartItems);

module.exports = router;

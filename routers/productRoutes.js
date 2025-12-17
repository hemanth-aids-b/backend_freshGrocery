const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Get all products (public)
router.get('/', getAllProducts);

// Add a product
router.post('/', addProduct);

// Update a product
router.put('/:id', updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

// Get product categories
router.get('/categories', (req, res) => {
  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Beverages', 'Snacks', 'Bakery'];
  res.json(categories);
});

module.exports = router;

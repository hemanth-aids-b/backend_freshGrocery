const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct } = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Get all products (public)
router.get('/', getProducts);

// Add a product (Admin only)
router.post('/', verifyAdmin, addProduct);

// Delete a product by ID (Admin only)
router.delete('/:id', verifyAdmin, deleteProduct);

module.exports = router;
// Get product categories
router.get('/categories', (req, res) => {
  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Beverages', 'Snacks', 'Bakery'];
  res.json(categories);
});

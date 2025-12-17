const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      message: 'Products fetched successfully',
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: err.message
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: savedProduct
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to add product',
      data: err.message
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null
      });
    }
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to update product',
      data: err.message
    });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null
      });
    }
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete product',
      data: err.message
    });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
};

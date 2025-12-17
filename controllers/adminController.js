const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');

// Add new admin
const addAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }

    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists',
        data: null
      });
    }

    const admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: { id: admin._id, email: admin.email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: error.message
    });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json({
      success: true,
      message: 'Admins fetched successfully',
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: error.message
    });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Admin deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: error.message
    });
  }
};

module.exports = { addAdmin, getAllAdmins, deleteAdmin };

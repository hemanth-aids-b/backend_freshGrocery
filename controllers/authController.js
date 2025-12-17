const User = require('../models/User');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        data: null
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'This email is already exist as an admin',
        data: null
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: error.message
    });
  }
};

const login = async (req, res) => {
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

    // Check if admin
    const admin = await Admin.findOne({ email });
    if (admin) {
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials',
          data: null
        });
      }
      return res.json({
        success: true,
        message: 'Admin login successful',
        data: { id: admin._id, email: admin.email, role: 'admin', isAdmin: true }
      });
    }

    // Check if regular user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
        data: null
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: { id: user._id, name: user.name, email: user.email, role: 'user', isAdmin: false }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: error.message
    });
  }
};

module.exports = { signup, login };
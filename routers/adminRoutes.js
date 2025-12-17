const express = require('express');
const { body } = require('express-validator');
const { addAdmin, getAllAdmins, deleteAdmin } = require('../controllers/adminController');

const router = express.Router();

// Add admin
router.post('/add', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], addAdmin);

// Get all admins
router.get('/', getAllAdmins);

// Delete admin
router.delete('/:id', deleteAdmin);

module.exports = router;
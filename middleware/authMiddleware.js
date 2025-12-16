const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify admin users
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Expect: "Bearer TOKEN"
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied, admin only' });

    req.user = user; // optional, can use in controllers
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyAdmin };

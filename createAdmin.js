require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();
    
    const email = 'suryasekar626@gmail.com';
    const password = 'surya@123';
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    console.log('\n=== COPY THIS TO MONGODB ATLAS ===');
    console.log(JSON.stringify({
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }, null, 2));
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Email:', email);
    console.log('Password:', password);
    
    const adminCollection = mongoose.connection.db.collection('admins');
    
    // Check if admin already exists
    const existing = await adminCollection.findOne({ email });
    if (existing) {
      console.log('\nAdmin already exists! Updating password...');
      await adminCollection.updateOne(
        { email },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );
      console.log('Password updated successfully!');
    } else {
      await adminCollection.insertOne({
        email: email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('\nAdmin created successfully!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};}

createAdmin();
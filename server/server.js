const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/projects', require('./routes/projects'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sri Balaji Earth Movers API running' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Seed default admin if not exists
    const Admin = require('./models/Admin');
    const bcrypt = require('bcryptjs');
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@sribalaji.com' });
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'sribalaji@2024', 10);
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@sribalaji.com',
        password: hashed,
        name: 'Admin'
      });
      console.log('✅ Default admin created: admin@sribalaji.com / sribalaji@2024');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

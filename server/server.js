const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://earth-moving-website.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
    
    // Seed/Update admin
    const Admin = require('./models/Admin');
    const bcrypt = require('bcryptjs');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sribalaji.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'sribalaji@2024';
    
    const existing = await Admin.findOne({ email: adminEmail });
    const hashed = await bcrypt.hash(adminPass, 10);
    
    if (!existing) {
      await Admin.create({
        email: adminEmail,
        password: hashed,
        name: 'Admin User'
      });
      console.log(`✅ Admin created: ${adminEmail}`);
    } else {
      // Update password to match .env
      existing.password = hashed;
      await existing.save();
      console.log(`✅ Admin credentials synchronized for: ${adminEmail}`);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

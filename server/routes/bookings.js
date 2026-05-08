const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const nodemailer = require('nodemailer');

// POST /api/bookings — Public booking form submission
router.post('/', async (req, res) => {
  try {
    const { name, phone, location, workType, date, message } = req.body;

    if (!name || !phone || !location || !workType || !date) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const booking = await Booking.create({ name, phone, location, workType, date, message });
    
    // Email Notification Logic
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sribalajiearthmovers@gmail.com', // Primary business email
      subject: `New Inquiry: ${workType} from ${name}`,
      text: `
        New Booking Inquiry Received:
        Name: ${name}
        Phone: ${phone}
        Location: ${location}
        Work Type: ${workType}
        Date: ${date}
        Message: ${message || 'No additional message'}
      `
    };

    // Only attempt to send if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error('📧 Email Error:', error);
        else console.log('📧 Email Sent:', info.response);
      });
    }
    
    console.log(`📅 New Booking Logged: ${name} - ${phone}`);
    
    res.status(201).json({
      success: true,
      message: 'Inquiry Logged. Our team will contact you shortly.',
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log inquiry. Please try again.' });
  }
});

// GET /api/bookings — Admin: get all bookings
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/bookings/:id — Admin: update booking status
router.patch('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/bookings/:id — Admin: delete booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ success: true, message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

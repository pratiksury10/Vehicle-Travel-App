// Import required modules
const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens
const User = require('../models/user'); // Import User model
const Trip = require('../models/trip');
const router = express.Router();

// POST /login route to handle user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    console.log('Login successful, token generated');
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// POST /register route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User  registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});



// Example route to create a trip
router.post('/trips', async (req, res) => {
    try {
        const { userId, latitude, longitude, timestamp, ignition } = req.body;
        const trip = new Trip({ userId, latitude, longitude, timestamp, ignition });
        await trip.save();
        res.status(201).json({ message: 'Trip created successfully', trip });
    } catch (err) {
        res.status(500).json({ message: 'Error creating trip' });
    }
});

// Example route to get all trips
router.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trips' });
    }
});


module.exports = router;
const User = require('./User '); // Import your User model

// Function to create a new user
const createUser  = async (req, res) => {
  const { email, password } = req.body; // Get email and password from the request body
  const user = new User({ email, password });

  try {
    await user.save();
    res.status(201).send('User  saved successfully');
  } catch (err) {
    res.status(400).send(err.message); // Send error message if save fails
  }
};

// Example Express route
const express = require('express');
const router = express.Router();

router.post('/register', createUser ); // Register route

module.exports = router; // Export the router
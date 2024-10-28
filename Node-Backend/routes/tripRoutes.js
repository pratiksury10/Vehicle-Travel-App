const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const multer = require('multer'); // For handling file uploads

// Set up multer for CSV file uploads
const upload = multer({ dest: 'uploads/' }); // Adjust the destination as needed

// Route to upload trip data
router.post('/upload', upload.single('tripFile'), tripController.uploadTripData);

// Route to get trips for a user
router.get('/:userId', tripController.getUserTrips);

// Route to calculate trip details
router.get('/details/:tripId', tripController.calculateTripDetails);

module.exports = router;
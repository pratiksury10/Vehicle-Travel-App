// Import required modules
const express = require('express');
const multer = require('multer'); // For handling multipart/form-data
const router = express.Router();

// Set up Multer for file uploads
const upload = multer({
  dest: './uploads/', // Destination folder for uploaded files
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

// POST /upload route to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // File uploaded successfully
    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: 'Error uploading file' });
  }
});

module.exports = router;
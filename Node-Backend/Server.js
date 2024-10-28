// const fs = require('fs');
// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const tripController = require('./controllers/tripController');
// const trip = require('./models/trip');
// const tripRoutes = require('./routes/tripRoutes');
// require('dotenv').config(); // Load environment variables

// const app = express();
// // const filePath = path.join(__dirname, 'trip.csv'); // Remove this if you're not using it

// // MongoDB connection
// const uri = process.env.MONGO_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected!'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define the data schema
// const dataSchema = new mongoose.Schema({
//     latitude: Number,
//     longitude: Number,
//     timestamp: Date,
//     ignition: String,
// });

// const Data = mongoose.model('Data', dataSchema);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// app.use(express.json());
// app.use('/api/trips', tripRoutes);


const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const tripRoutes = require('./routes/tripRoutes');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from React app
}));
app.use(express.json());
app.use('/api', authRoutes);

// MongoDB connection
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define the data schema (if this is not used, you can remove it)
const dataSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: Date,
    ignition: String,
});

const Data = mongoose.model('Data', dataSchema); // If this model is not used, consider removing it

// API Routes
app.use('/api/trips', tripRoutes); // Make sure your tripRoutes are properly set up
// app.use('/api', authRoutes); // Authentication routes
// app.use('/api', userRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

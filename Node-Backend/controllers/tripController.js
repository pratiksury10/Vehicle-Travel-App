const Trip = require('../models/Trip');
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Function to upload trip data
const uploadTripData = async (req, res) => {
    const { userId } = req.body; // Assuming user ID is sent in the request
    const tripDataFile = req.file; // Assuming you're using multer for file uploads

    if (!tripDataFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const results = [];

    // Parse the uploaded CSV file
    fs.createReadStream(tripDataFile.path)
        .pipe(csv())
        .on('data', (data) => {
            results.push({ ...data, userId }); // Include userId in each trip data entry
        })
        .on('end', async () => {
            try {
                await Trip.insertMany(results);
                return res.status(201).json({ message: 'Trip data uploaded successfully!' });
            } catch (error) {
                return res.status(500).json({ error: 'Error uploading trip data', details: error });
            } finally {
                // Clean up the uploaded file if needed
                fs.unlinkSync(tripDataFile.path);
            }
        })
        .on('error', (error) => {
            return res.status(500).json({ error: 'Error reading the file', details: error });
        });
};

// Function to fetch trips by user ID
const getUserTrips = async (req, res) => {
    const { userId } = req.params;
    try {
        const trips = await Trip.find({ userId });
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching trips', details: error });
    }
};

// Function to calculate trip details
const calculateTripDetails = async (req, res) => {
    const { tripId } = req.params;

    try {
        const tripData = await Trip.findById(tripId);

        if (!tripData) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Calculate total distance, idling, and stoppage durations
        let totalDistance = 0;
        let idlingDuration = 0;
        let stoppageDuration = 0;

        // Assuming tripData has fields like latitude, longitude, and timestamp
        const gpsData = tripData.gpsData; // Adjust according to your data structure

        for (let i = 1; i < gpsData.length; i++) {
            const prevPoint = gpsData[i - 1];
            const currentPoint = gpsData[i];

            // Calculate distance between two GPS coordinates
            const distance = calculateDistance(
                prevPoint.latitude,
                prevPoint.longitude,
                currentPoint.latitude,
                currentPoint.longitude
            );
            totalDistance += distance;

            // Check for idling or stoppage
            const timeDiff = new Date(currentPoint.timestamp) - new Date(prevPoint.timestamp);

            // Define thresholds for idling and stoppage (e.g., 0 speed for 5 minutes is a stoppage)
            if (timeDiff > 300000) { // If stopped for more than 5 minutes
                stoppageDuration += timeDiff;
            } else if (distance === 0) { // If the vehicle didn't move
                idlingDuration += timeDiff;
            }
        }

        return res.status(200).json({ totalDistance, idlingDuration, stoppageDuration });
    } catch (error) {
        return res.status(500).json({ error: 'Error calculating trip details', details: error });
    }
};

// Helper function to calculate distance between two GPS coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

module.exports = {
    uploadTripData,
    getUserTrips,
    calculateTripDetails,
};

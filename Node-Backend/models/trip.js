const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to User model
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    ignition: { type: String, required: true },
});

//const Trip = mongoose.model('Trip', tripSchema); // Capitalize the model name

const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

module.exports = Trip; // Ensure you are exporting the model correctly

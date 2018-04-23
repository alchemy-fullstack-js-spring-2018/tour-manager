const mongoose = require('mongoose');
const { Schema } = mongoose;

const stopSchema = new Schema ({
    location: {
        city: String,
        state: String,
        zip: String
    },
    weather: {
        condition: String,
        windSpeed: String,
        sunset: String,
    },
    attendance: { type: Number, min: 1 }
});

const tour = new Schema ({
    title: { type: String, required: true },
    activities: { type: [String], required: true },
    launchDate: { type: Date, default: Date.now() },
    stops: [stopSchema]
});

module.exports = mongoose.model('Tour', tour);
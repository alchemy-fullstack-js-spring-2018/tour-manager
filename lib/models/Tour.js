const mongoose = require('mongoose');
const { Schema } = mongoose;

const tour = new Schema ({
    title: { type: String, required: true },
    activities: { type: [String], required: true },
    launchDate: { type: Date, default: Date.now() },
    stops: [{
        location: {
            city: String,
            State: String,
            zip: String
        },
        weather: {
            condition: String,
            windSpeed: String,
            sunset: String,
        },
        attendance: { type: Number, min: 1 }
    }]
});

module.exports = mongoose.model('Tour', tour);
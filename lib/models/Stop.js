const mongoose = require('mongoose');
const { Schema } = mongoose;

const stop = new Schema ({
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
});

module.exports = mongoose.model('Stop', stop);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now
    },
    stops: [{
        location: {
            state: String,
            city: String,
            zip: String
        },
        attendance: {
            type: Number,
            min: 1
        },
        weather: {
            temperature: String,
            sunset: String
        }
    }]
});

module.exports = mongoose.model('Tour', schema);
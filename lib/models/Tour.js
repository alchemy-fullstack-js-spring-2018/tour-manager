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
            city: String,
            state: String,
            zip: String
        },
        weather: {
            temperature: String,
            condition: String,
            sunrise: String,
            sunset: String
        },
        attendence: {
            type: Number,
            min: 1
        }
    }]
});

module.exports = mongoose.model('Tour', schema);
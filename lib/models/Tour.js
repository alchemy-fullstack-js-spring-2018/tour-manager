const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const stopsSchema = new Schema({
    location: {
        city: String,
        state: String,
        zip: RequiredString
    },
    weather: {
        temperature: String,
        condition: String,
        sunset: String
    },
    attendance: {
        type: Number,
        min: 1
    }
});

const tourSchema = new Schema({
    title: RequiredString,
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now
    },
    stops: [stopsSchema]
});

module.exports = mongoose.model('Tour', tourSchema);
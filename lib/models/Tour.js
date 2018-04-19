const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    title: RequiredString,
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now
    },
    stops: [{
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
    }]
});

module.exports = mongoose.model('Tour', schema);
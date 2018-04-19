const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    title: RequiredString,
    activities: [String],
    launchDate: {
        type: Date,
        required: true,
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
            condition: String
        },
        attendance: {
            type: Number,
            min: 1
        }

    }]
});

module.exports = mongoose.model('Tour', schema);
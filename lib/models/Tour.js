const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
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

module.exports = mongoose.model('Tours', schema);
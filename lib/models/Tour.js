const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
    activities: {
        type: [String],
        required: true
    },
    launchDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stops: [{
        location: {
            city: RequiredString,
            state: RequiredString,
            zip: RequiredString
        },
        weather: {
            temperature: RequiredString,
            condition: RequiredString,
            attendance: {
                type: Number,
                min: 1
            }

        }
    }]
});

module.exports = mongoose.model('Tours', schema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    title: RequiredString,
    activities: [RequiredString],
    launchDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stops: [{
        location: {
            city: String,
            state: String,
            zip: Number
        },
        weather: {
            temperature: String,
            condition:String
        },
        audience: {
            type: Number,
            min: 1
        } }]
});

module.exports = mongoose.model('tours', schema);
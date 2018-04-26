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
        locations: {
            city: String,
            state: String,
            zip: String
        },
        weather: {
            temperature: String,
            condition:String
        },
        audience: {
            type: String,
            minlength: 1
        } }]
});

module.exports = mongoose.model('Tour', schema);
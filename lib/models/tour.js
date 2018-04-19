const mongoose = require('mongoose');
const helper = require('./utility/helperVariables');
const { Schema } = mongoose;


const schema = new Schema({
    title: helper.Requiredstring,
    activities: [helper.Requiredstring],
    launchDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stops: {
        type: Object,
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
        }
    }
});

module.exports = mongoose.model('tours', schema);
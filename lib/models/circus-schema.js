const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    title: RequiredString,
    activities:{
        ...RequiredString,
        enum: ['Beard acrobats', 'Lion taming', 'Fire dancing']
    },
    launchDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stops: [{
        location: [{ 
            city: String,
            state: String,
            country: String,
            elevation: String
        }],
        weather: [{
            temperature: String,
            condition: String,
            windSpeed: String,
            windDir: String,
            sunrise: String,
            sunset: String
        }],
        attendence: {
            type: Number,
            min: 0  
        },
    }]

});

module.exports = mongoose.model('circusTour', schema);

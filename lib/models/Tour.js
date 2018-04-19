const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

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
            state: {
                type: String,
                required: true,
                enum: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
            },
            zip: String
        },
        weather: {
            temperature: Number,
        },
        attendance: {
            type: Number,
            min: 1
        }
    }]
});

module.exports = mongoose.model('Tour', schema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: { 
        type: String,
        required: true, 
    },
    activities: [{ 
        type: String,
        maxlength: 100 }],
    launched: {
        type: Date,
        default: Date.now
    },
    stops: [{
        location: {
            city: String,
            state: {
                type: String,
                enum: ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU',
                    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO',
                    'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA',
                    'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'] 
            },
            zip: {
                type: String,
                required: true,
                maxlength: 10
            }
        },
        attendence: {
            type: Number,
            min: 1
        },
        weather: {
            temperature: {
                type: String,
                maxlength: 4,
            },
            percipitation: {
                type: String
            },
            wind: {
                type: String
            }
        }
    }]
});

module.exports = mongoose.model('Circus', schema);
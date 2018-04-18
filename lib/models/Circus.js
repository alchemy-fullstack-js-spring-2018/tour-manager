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
        default: new Date()
    },
    stops: [{
        type: Object
    }]
});

module.exports = mongoose.model('Circus', schema);
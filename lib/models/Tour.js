const mongoose = require('mongoose');
const { Schema } = mongoose;

const tour = new Schema ({
    title: { type: String, required: true },
    activities: { type: [String], required: true },
    launchDate: { type: Date, default: Date.now() },
    stops: []
});

module.exports = mongoose.model('Tour', tour);
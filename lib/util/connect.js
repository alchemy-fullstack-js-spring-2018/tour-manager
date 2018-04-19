const mongoose = require('mongoose');

module.exports = function(dbUri) {
    
    const promise = mongoose.connect(dbUri);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose Default Connection Open To', dbUri);
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose Default Connection Error', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose Default Connection Disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose Default Connection Disconnected Through App Termination');
            process.exit(0);
        });
    });

    return promise;
};
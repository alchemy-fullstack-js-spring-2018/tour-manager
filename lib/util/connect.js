/* eslint no-console:off */

const mongoose = require('mongoose');

module.exports = dbUri => {
    const promise = mongoose.connect(dbUri);

    mongoose.connection.on('connected', () => {
        console.log(`mongoose default connection open to ${dbUri}`);
    });

    mongoose.connection.on('error', (err) => {
        console.log(`mongoose default connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongoose default connection disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return promise;
};
/* eslint no-console: off */
const mongoose = require('mongoose');

module.exports = function(dbURI) {
    const promise = mongoose.connect(dbURI);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose conn opened to: ', dbURI);
    });

    mongoose.connection.on('error', err => {
        console.log('Mongoose conn error: ', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose conn disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose conn SIGINT disconnected');
            process.exit(0);
        });
    });
    return promise;
};
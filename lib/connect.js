/* eslint no-console: "off" */
const mongoose = require('mongoose');

module.exports = function(dbUri){

    const promise = mongoose.connect(dbUri);

    //connection events
    //when successfully connected

    mongoose.connection.on('connected', () => {
        console.log('Mongoose default connection open to ' + dbUri);
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongoose default connection disconected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default conncetion disconnected throug happ termination');
            process.exit(0);
        });
    });

    return promise;
};

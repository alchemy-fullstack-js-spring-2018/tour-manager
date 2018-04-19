const mongoose = require('mongoose');

module.exports = (dbUri) => {

    const promise = mongoose.connect(dbUri);

    mongoose.connection.on('connection', () => {
        console.log('Mongoose is on!');
    });

    mongoose.connection.on('error', err => {
        console.log('Mongoose has an error.', err);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose has closed by way of the app.');
        });
    });
    return promise;
};
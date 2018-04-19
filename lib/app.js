const express = require('express');
const app = express();
const fleas = require('./routes/flea');

app.use(express.json());

app.use('/fleas', fleas);

module.exports = app;
const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const stops = require('./routes/stops');

app.use(express.json());

app.use('/stops', stops);

app.use(errorHandler());

module.exports = app;
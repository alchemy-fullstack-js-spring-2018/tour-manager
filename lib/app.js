const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const tours = require('./routes/tours');

app.use(express.json());

app.use('/tours', tours);

// make sure error handler is last app.use
app.use(errorHandler());

module.exports = app;
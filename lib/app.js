const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');
const tours = require('./routes/tours');

// app.use(morgan('dev'));

app.use(express.json());

app.use('/tours', tours);

app.use(errorHandler());

module.exports = app;
const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./util/error-handler');
const tours = require('./routes/tours');

app.use(express.json());
app.use(morgan('dev'));

app.use('/tours', tours);

app.use(errorHandler());

module.exports = app;
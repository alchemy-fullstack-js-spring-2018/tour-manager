const express = require('express');
const app = express();
const morgan = require('morgan');
const tours = require('./routes/tours');

app.use(express.json());
app.use(morgan('dev'));
app.use('/tours', tours);

module.exports = app;
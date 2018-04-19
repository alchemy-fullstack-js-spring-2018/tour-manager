const express = require('express');
const app = express();
const errorHandler = require('./utils/error-hander');
const tours = require('./routes/tours');

app.use(express.json);

app.use('/tours', tours);

app.use(errorHandler());

module.exports = app;
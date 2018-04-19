const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const tours = require('./routes/tours');
// const getWeather = require('./util/get-weather-location');
// const appendWeather = require('./util/getWeather');

app.use(express.json());

app.use('/tours', tours);

app.use(errorHandler());

module.exports = app;
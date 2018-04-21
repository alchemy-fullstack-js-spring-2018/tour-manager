const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./util/error-handler');
const tours = require('./routes/tours');
const zipProcessor = require('./util/zip-processor');
const weatherFetcher = require('./util/weather-fetcher');

app.use(express.json());
app.use(morgan('dev'));
app.use('/tours', tours);
app.post('/tours/:id/stops', zipProcessor(weatherFetcher));

app.use(errorHandler());

module.exports = app;
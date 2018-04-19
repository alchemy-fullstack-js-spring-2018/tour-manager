const express = require('express');
const app = express();
const morgan = require('morgan');
const tours = require('./routes/tours');
const zipProcessor = require('./util/zip-processor');
const weatherFetcher = require('./util/weather-fetcher');

app.use(express.json());
app.use(morgan('dev'));
app.use('/tours', tours);
app.post('/tours/:id/stops', zipProcessor(weatherFetcher));

module.exports = app;
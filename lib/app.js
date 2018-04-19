const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const circus = require('./routes/circus');
const findZip = require('./util/find-zip');
const getWeather = require('./util/get-weather');

app.use(express.json());

app.use('/tours', circus);

app.post('/tours/:id/stops', findZip(getWeather));

// make sure error handler is last app.use
app.use(errorHandler());

module.exports = app;
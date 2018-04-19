const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const circus = require('./routes/circus');

app.use(express.json());

app.use('/tours', circus);

// make sure error handler is last app.use
app.use(errorHandler());

module.exports = app;
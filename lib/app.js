const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const tours = require('./routes/tours');
const postStop = require('./models/postStop');

app.use(express.json());

app.use('/tours', tours);

app.use(postStop());

app.use(errorHandler());

module.exports = app;
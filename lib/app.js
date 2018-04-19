const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const circus = require('./routes/circus-router');

app.use(express.json());

app.use('/circustour', circus);

app.use(errorHandler());

module.exports = app;
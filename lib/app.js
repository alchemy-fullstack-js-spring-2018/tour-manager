const express = require('express');
const app = express();
const tours = require('./routes/tour');

app.use(express.json());

app.use('/tours', tours);

module.exports = app;
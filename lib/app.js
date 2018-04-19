const express = require('express');
const app = express();
const tours = require('./routes/tours');

app.use(express.json());

app.use('/teams', tours);

module.exports = app;
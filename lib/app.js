const express = require('express');
const app = express();
const tours = require('./routes/tours');

app.use(express.json());
app.use('/tours', tours);

module.exports = app;
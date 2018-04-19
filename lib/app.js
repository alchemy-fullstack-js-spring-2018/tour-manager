const express = require('express');
const app = express();
const tours = require('./routes/tours');
//const api = require('./services/weatherApi');

app.use(express.json());

app.put('/:id', (req, res, next) => {

    next();
});

app.use('/tours', tours);

module.exports = app;
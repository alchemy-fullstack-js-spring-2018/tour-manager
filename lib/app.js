const express = require('express');
const app = express();
const tours = require('./routes/tours');
//const api = require('./services/weatherApi');

app.use(express.json());

// const getWeather = (req, res, next) => {
    
// }

app.put('/:id', (req, res, next) => {
    if(!req.query.zip){
        //run get weather function to get weather data add to body
    } else {
        //get weather function with it's default zip
    }
    next();
});

app.use('/tours', tours);

module.exports = app;
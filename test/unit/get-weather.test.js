/* eslint no-console: off */
const dotenv = require('dotenv');
dotenv.config();
const zip = '97211';

const getWeatherLocation = require('../../lib/util//get-weather-location');

getWeatherLocation(zip)
    .then(output => {
        console.log(output);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    });
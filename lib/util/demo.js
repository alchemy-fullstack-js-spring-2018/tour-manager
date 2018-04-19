const zip = process.argv[2] || '97211';

const getWeatherLocation = require('./get-weather-location');

getWeatherLocation(zip)
    .then(output => {
        console.log(output);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    });
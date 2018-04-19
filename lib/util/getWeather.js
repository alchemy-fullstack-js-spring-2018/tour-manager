const getWeather = require('./get-weather-location');

module.exports = function get(api) {

    return function(req, res, next) {
        console.log('QUERY', req.query.zip);
        api(req.query.zip).then(weatherData => {
            req.body.temperature = weatherData.weather.temperature;
            req.body.condition = weatherData.weather.condition;
            req.body.city = weatherData.location.city;
            req.body.state = weatherData.location.state;
            next();
        });
    };
};
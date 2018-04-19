module.exports = function get(weatherData) {

    return function(req, res, next) {
        req.body.weather.temperature = weatherData.weather.temperature;
        req.body.weather.condition = weatherData.weather.condition;
        req.body.location.city = weatherData.location.city;
        req.body.location.state = weatherData.location.state;
        next();
    };

};
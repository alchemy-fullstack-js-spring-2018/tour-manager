module.exports = function getWeather(api) {

    return function(req, res, next) {
        api(req.query.zip).then(weatherData => {
            req.body.temperature = weatherData.weather.temperature;
            req.body.condition = weatherData.weather.condition;
            req.body.city = weatherData.location.city;
            req.body.state = weatherData.location.state;
            req.body.zip = req.query.zip;
            req.body.id = req.params.id;
            next();
        });
    };
};
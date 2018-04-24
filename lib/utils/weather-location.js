module.exports = function getWeatherLocation(api){
    return (req, res, next) => {
        if(!req.body.zip) next();
        api(req.body.zip)
            .then(({ weather, location }) => {
                req.body.weather = weather;
                req.body.location = location;
                next();
            })
            .catch(next);
    };
};
module.exports = api => {
    return (req, res, next) => {
        api(req.body.zip)
            .then(({ weather, location }) => {
                req.body.weather = weather;
                req.body.location = location;
                next();
            })
            .catch(next);
    };
};
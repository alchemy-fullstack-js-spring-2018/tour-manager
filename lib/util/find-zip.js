module.exports = api => {
    return (req, res, next) => {
        let zip = req.body.location ? req.body.location.zip : req.body.zip;
        if(!zip) next();
        api(zip)
            .then(({ location, weather }) => {
                req.body = {
                    location: {
                        ...location,
                        zip: zip
                    },
                    weather: weather
                };
                next();
            })
            .catch(next);
    };
}; 
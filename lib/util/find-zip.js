module.exports = api => {
    return (req, res, next) => {
        const zip = req.body.location.zip;
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
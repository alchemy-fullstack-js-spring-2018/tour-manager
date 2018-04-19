
module.exports = fetchZip => {
    return (req, res, next) => {
        const zip = req.body;

        return fetchZip(zip)
            .then(({ weather, location }) => {
                req.body = {
                    location: {
                        ...location,
                        zip: zip
                    },
                    weather: weather
                };
                next();
            })
            .catch(err => console.log(err)); // eslint-disable-line
    };
}; 
                    
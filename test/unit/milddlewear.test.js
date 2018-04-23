const { assert } = require('chai');

function createWeatherLocationMiddleware(api){
    return (req, res, next) => {
        api(req.body.zip)
            .then(({ weather, location }) => {
                req.body.weather = weather;
                req.body.location = location;
                next();
            })
            .catch(next);
    };
}

it.only('puts details about the weather on req.body based on zip', done => {

    const weather = {};
    const location = {};
    const api = zip => {
        api.zip = zip;
        return Promise.resolve({ weather, location });
    };

    const middleware = createWeatherLocationMiddleware(api);
    const zip = 17171;
    const req = {
        body: { zip }
    };

    const next = () => {
        assert.equal(req.body.weather, weather);
        assert.equal(req.body.location, location);
        done();
    };

    middleware(req, null, next);

    assert.equal(api.zip, zip);
});

it.only('calls next with error on fail', done => {
    const error = {};
    const api = () => {
        return Promise.reject(error);
    };

    const middleware = createWeatherLocationMiddleware(api);

    const next = err => {
        assert.equal(err, error);
        done();
    };

    const req = {
        body: { }
    };

    middleware(req, null, next);

});
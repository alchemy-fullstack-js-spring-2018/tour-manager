const { assert } = require('chai');

function createWeatherLocationMiddleware(api){
    return (req, res, next) => {
        api(req.body.zip)
            .then(({ weather, location }) => {
                req.body.weather = weather;
                req.body.location = location;
            });
    };
}

it.only('puts details about the weather on req.body based on zip', () => {

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

    let called = false;
    const next = () => called = true;

    middleware(req, null, next);

    assert.equal(api.zip, zip);
    assert.equal(req.body.weather, weather);
    assert.equal(req.body.location, location);

});
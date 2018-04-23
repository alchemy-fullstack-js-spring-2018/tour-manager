const { assert } = require('chai');

function createWeatherLocationMiddleware(api){
    return (req, res, next) => {
        api(req.body.zip);
    };
}

it('puts details about the weather on req.body based on zip', () => {

    const api = zip => {
        api.zip = zip;
    };

    const middleware = createWeatherLocationMiddleware(api);
    const zip = 17171
    const req = {
        bod: { zip }
    };

    let called = false;
    const next = () => called = true;

    middleware(req, null, next);

    assert.equal(api.zip, zip);
});
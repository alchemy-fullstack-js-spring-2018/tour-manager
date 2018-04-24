const { assert } = require('chai');
const getWeather = require('../../lib/util/getWeather');

describe('getWeather Middleware', () => {
    it('Augments req.body with location/weather info', done => {

        const req = {
            query: {
                zip: '97205'
            },
            body: {
                temperature: '',
                condition: '',
                city: '',
                state: '',
                zip: ''
            },
            params: {
                id: 5
            }
        };

        const next = () => { 
            assert.equal(req.body.temperature, 55);
            assert.equal(req.body.city, 'Portland');
            done();
        };

        const api = (zip) => {
            const weatherData = {
                weather: {
                    temperature: '55',
                    condition: 'Partly Cloudy'
                },
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: zip
                }
            };
            return Promise.resolve(weatherData);
        };
        
        const middleware = getWeather(api);

        middleware(req, null, next);

    });
});
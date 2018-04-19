const { assert } = require('chai');
const getWeather = require('../../lib/util/getWeather');

describe.skip('getWeather Middleware', () => {
    it.skip('Augments req.body with location/weather info', () => {
        const weatherData = {
            weather: {
                temperature: '55',
                condition: 'Partly Cloudy'
            },
            location: {
                city: 'Portland',
                state: 'OR'
            }
        };
        
        const middleware = getWeather(weatherData);

        let called = false;
        const next = () => { called = true; };

        let req = {
            header: 'some data',
            body: {
                weather: {},
                location: {}
            }
        };

        middleware(req, null, next);

        assert.isTrue(called);
        assert.deepEqual(req, { header: 'some data', 
            body: {
                weather: {
                    temperature: '55',
                    condition: 'Partly Cloudy'
                },
                location: {
                    city: 'Portland',
                    state: 'OR'
                }
            } });
    });
});
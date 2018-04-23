const { assert } = require('chai');
const getWeather = require('../../lib/util/getWeather');

describe.skip('getWeather Middleware', () => {
    it('Augments req.body with location/weather info', () => {
        // const weatherData = {
        //     weather: {
        //         temperature: '55',
        //         condition: 'Partly Cloudy'
        //     },
        //     location: {
        //         city: 'Portland',
        //         state: 'OR'
        //     }
        // };

        const api = (zip) => {
            console.log('Looking up zip code:', zip);
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
            return weatherData;
        };
        
        const middleware = getWeather(api);

        let called = false;
        const next = () => { called = true; };

        let req = {
            query: {
                zip: '97205'
            }
        };

        middleware(req, null, next);

        assert.ok(called);
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
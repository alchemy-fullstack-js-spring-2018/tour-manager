const { assert } = require('chai');
const zipProcessor = require('../../lib/util/zip-processor');

describe('location enhancer middleware', () => {
    it('takes a data-fetching function and a zip code and updates the request body with information about that location, then calls next', () => {
        const mockFetchFunction = () => {
            return Promise.resolve({
                location: {
                    city: 'Portland',
                    state: 'OR'
                },
                weather: {
                    temperature: '41',
                    condition: 'Clear',
                    sunset: '20:02' 
                }
            });
        };

        const mockReq = {
            method: 'POST',
            url: '/tours/1234/stops',
            body: '97214'
        };

        let called = false;
        const next = () => { called = true; };

        const locationEnhancer = zipProcessor(mockFetchFunction);
        
        locationEnhancer(mockReq, null, next)
            .then(() => {
                assert.containsAllKeys(mockReq.body.location, ['city', 'state', 'zip']);
                assert.containsAllKeys(mockReq.body.weather, ['temperature', 'condition', 'sunset']);
                assert.ok(called);
            });
    });
});
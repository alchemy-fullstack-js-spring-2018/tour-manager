const { assert } = require('chai');
const locationEnhancer = require('../../lib/middleware/location-enhancer');

describe('location enhancer', () => {
    it('takes a weather api (which takes a zip code) and returns middleware that updates the request body with information about the location, then calls next', () => {
        const mockAPI = () => {
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

        const testZip = '97214';
        const mockReq = {
            body: { zip: testZip }
        };

        const next = () => { 
            assert.containsAllKeys(mockReq.body.location, ['city', 'state', 'zip']);
            assert.containsAllKeys(mockReq.body.weather, ['temperature', 'condition', 'sunset']);
            assert.strictEqual(mockReq.body.location.zip, testZip);
        };

        const middleware = locationEnhancer(mockAPI);
        
        middleware(mockReq, null, next);
    });
});
const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('Valid and good model', () => {
        const data = {
            title: 'The Test Tour',
            activities: ['testing models', 'testing validations', 'testing testing'],
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: '97205'
                },
                weather: {
                    condition: 'Sunny',
                    windSpeed: '5mph',
                    sunset: 'Like 6 or whatever',
                }
            }]
        };

        const tour = new Tour(data);

        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        data.launchDate = tour.launchDate;
        assert.deepEqual(tour.toJSON(), data);

        assert.isUndefined(tour.validateSync());
    });

});
const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour Model', () => {

    it('valid good model', () => {
        const data = {
            title: 'VOLTA',
            activities: ['street sports', 'gameshow', 'acrobatics'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'Oregon',
                    zip: '99999'
                },
                weather: {
                    temperature: '73',
                    condition: 'sunny',
                    windSpeed: '10',
                    windDir: 'north',
                    sunrise: '6:30',
                    sunset: '6:30'
                },
                attendence: 100
            }]
        };

        const tour = new Tour(data);

        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), data);

        assert.isUndefined(tour.validateSync());
    });
});
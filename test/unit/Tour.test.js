const { assert } = require('chai');
const Tour = require('../../lib//models/Tour');

describe('Tour Model', () => {
    const data = {
        name: 'The Grand Tour of Splendor',
        activities: ['Juggling', 'Magic', 'Bear Wrestling'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Columbus',
                state: 'OH',
                zip: '43004'
            },
            weather: {
                temperature: '55',
                condition: 'Mostly Cloudy',
                attendance: 55
            }
        }]
    };

    const tour = new Tour(data);

    data._id = tour._id;
    data.stops[0]._id = tour.stops[0]._id;
    assert.deepEqual(tour.toJSON(), data);

    assert.isUndefined(tour.validateSync());
});

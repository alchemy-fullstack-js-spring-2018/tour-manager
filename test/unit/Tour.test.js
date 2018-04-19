const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('is a valid, good model', () => {
        const info = {
            title: 'Mongo Mystique',
            activities: ['curly brace juggling', 'id clowning', 'dollar sign magic', 'schema swallowing'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: '97209'
                },
                weather: {
                    temperature: '54',
                    condition: 'Partly Cloudy',
                    sunset: '20:01'
                },
                attendance: 47
            }]
        };

        const tour = new Tour(info);

        info._id = tour._id;
        info.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), info);

        assert.isUndefined(tour.validateSync());
    });

    it('has a default launch date of now', () => {
        const tour = new Tour({});
        assert.ok(tour.launchDate);
        assert.isAtMost(tour.launchDate - Date.now(), 5);
    });

});
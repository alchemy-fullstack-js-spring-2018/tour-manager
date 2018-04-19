const { assert } = require('chai');
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {
    
    it('valid tour model', () => {
        const data = {
            title: 'Circus Circus',
            activities: ['knife juggling', 'fire eating', 'clowns'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'Oregon',
                    zip: '97221'
                },
                weather: {
                    temperature: '50',
                    sunset: '4pm'
                },
                attendance: 10
            }]
        };

        const tour = new Tour(data);
        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), data);
        
    });
});
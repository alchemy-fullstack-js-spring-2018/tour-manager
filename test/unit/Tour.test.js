const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe ('tour model', () => {

    it('valid good model', () => {
        const data = {
            title: 'Clown Fiesta',
            activities: ['Clown Boxing', 'Pumpkin Smashing', 'Air Ukelele'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Seattle',
                    state: 'WA',
                    zip: '98101'
                },
                weather: {
                    temperature: '72',
                    condition: 'good'
                },
                attendance: 12
            },
            {
                location: {
                    city: 'Mesa',
                    state: 'AZ',
                    zip: '85201'
                },
                weather: {
                    temperature: '86',
                    condition: 'hot'
                },
                attendance: 18
            }]
        };
        const tour = new Tour(data);

        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        data.stops[1]._id = tour.stops[1]._id;

        assert.deepEqual(tour.toJSON(), data);
    });
});
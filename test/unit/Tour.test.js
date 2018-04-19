const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour Model', () => {

    it('valid good model', () => {
        const data = {
            title: 'Carnival',
            activities: ['juggling', 'trapeze', 'fire breathing'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Conifer',
                    state: 'Colorado',
                    zip: '80433'
                },
                weather: {
                    temperature: '70',
                    condition: 'Sunny'
                },
                attendance: 200
            }]
        };

        const tour = new Tour(data);

        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), data);

        assert.isUndefined(tour.validateSync());
    });

});
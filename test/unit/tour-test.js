const { assert } = require('chai');
const Tour = require('../../lib/models/tour');

describe('flea circus model, fingers crossed', () => {
    it('valid and very good model', () => {
        const info = {
            title: 'Big Little Flea Circus',
            activities: ['big top', 'balloons', 'flea petting zoo', 'funnel cake'],
            launchDate: new Date(),
            stops: [{
                locations: {
                    city: 'Yakima',
                    state: 'Washington',
                    zip: 98901
                },
                weather: {
                    temperature: '54°F',
                    condition: 'Partly Cloudy' 
                },
                audience: 386
            },
            {
                locations: {
                    city: 'Clackamas',
                    state: 'Oregon',
                    zip: 97015
                },
                weather: {
                    temperature: '72°F',
                    condition: 'Sunny' 
                },
                audience: 634
            }]
        };

        const tour = new Tour(info);

        info._id = tour._id;
        info.activities[0]._id = tour.activities[0]._id,
        info.stops[0] = tour.stops[0];
        assert.deepEqual(tour.toJSON(), info);
        assert.isUndefined(tour.validateSync());
    });
});
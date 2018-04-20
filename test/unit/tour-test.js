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
                    zip: '98901'
                },
                weather: {
                    temperature: '54°F',
                    condition: 'Partly Cloudy' 
                },
                audience: '386'
            }]
        };

        const tour = new Tour(info);

        info._id = tour._id;
        info.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), info);
        assert.isUndefined(tour.validateSync());
    });

    it('has default date of now', () => {
        const newTour = new Tour({
            title: 'test',
            activities: ['test', 'test'],
            stops: [{ test: 'test' }] 
        });
        assert.ok(newTour.launchDate);
        assert.isAtMost(newTour.launchDate - Date.now(), 5);
    });

    it('returns error if nothing in required fields', () => {
        const newTour = new Tour({});
        newTour.save(err => {
            assert.equal(err.errors['title'].message, 'Path `title` is required.');
        });
    });
});
const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {

    it('is a valid model', () => {
        const data = {
            title: 'Spring swing',
            activities: ['fire-breathing', 'acrobatics', 'lion snuggling'],
            launchDate: new Date(),
            stops: {
                location: {
                    city: 'Gary',
                    state: 'IN'
                },
                weather: {
                    temperature: 102,
                },
                attendance: 27890
            }
        };

        const tour = new Tour(data);
        assert.deepEqual(tour.toJSON(), { _id: tour._id, ...data });
        assert.isUndefined(tour.validatedSync());
    });
});
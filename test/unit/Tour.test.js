const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {

    it('is a valid model', () => {
        const data = {
            title: 'Spring swing',
            activities: ['fire-breathing', 'acrobatics', 'lion snuggling'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Gary',
                    state: 'IN'
                },
                weather: {
                    temperature: 102,
                },
                attendance: 27890
            }]
        };

        const tour = new Tour(data);
        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), { _id: tour._id, ...data });
        assert.isUndefined(tour.validateSync());
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected errors but got none');
        return validation.errors;
    };

    it('requires required fields', () => {
        const tour = new Tour({});
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(errors.title.kind, 'required');
    });

    it('throws error if state is not in enum', () => {
        const testTour = new Tour({
            title: 'Boom',
            activities: ['goat-taming', 'dancing bears', 'lion snuggling'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Gary',
                    state: 'AA'
                },
                weather: {
                    temperature: 102,
                },
                attendance: 3
            }]
        });

        const errors = getValidationErrors(testTour.validateSync());
        assert.equal(errors['stops.0.location.state'].kind, 'enum');
    });

    it('throws error if attendance is < 1', () => {
        const testTour2 = new Tour({
            title: 'Boom',
            activities: ['fire-breathing', 'acrobatics', 'lion snuggling'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Gary',
                    state: 'IN'
                },
                weather: {
                    temperature: 102,
                },
                attendance: 0
            }]
        });
        const errors = getValidationErrors(testTour2.validateSync());
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});
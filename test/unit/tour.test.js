const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('Valid and good model', () => {
        const data = {
            title: 'The Test Tour',
            activities: ['testing models', 'testing validations', 'testing testing'],
            launchDate: new Date('January 1, 1900 00:00:00'),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: '97205'
                },
                weather: {
                    condition: 'Sunny',
                    windSpeed: '5mph',
                    sunset: 'Like 6 or whatever',
                }
            }]
        };

        const tour = new Tour(data);

        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), data);

        assert.isUndefined(tour.validateSync());
    });

    it('Has default date of "now"', () => {
        const tour = new Tour({ title: 'Right Now!', activities: ['this is just a test anyway']});
        assert.ok(tour.launchDate);
        assert.isAtMost(tour.launchDate - Date.now(), 5);
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'Expected validation errors but got none');
        return validation.errors;
    };

    it('Required fields work', () => {
        const tour = new Tour({activities: null});
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(Object.keys(errors).length, 2);
        assert.equal(errors.title.kind, 'required');
        assert.equal(errors.activities.kind, 'required');
    });

    it('Attendance minimum of 1', () => {
        const tour = new Tour({ stops:[{attendance: 0 }]});
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });

});
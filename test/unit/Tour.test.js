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

    it('has default date of now', () => {
        const tour = new Tour({ title: 'Carnival' });
        assert.ok(tour.launchDate);
        assert.isAtMost(tour.launchDate - Date.now(), 5);
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors but got none');
        return validation.errors;
    };

    it('required fields', () => {
        const tour = new Tour({});
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, 'required');    
    });

    it('attendance must be at least 1', () => {
        const tour = new Tour({
            stops: [
                { attendance: 9 }
            ]
        });
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });

});
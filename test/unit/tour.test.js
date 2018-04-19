const { assert } = require('chai');
const Tour = require('../../lib/models/tourSchema');

describe('Tour model', () => {

    it('is a valid model', () => {
        const data = {
            title: 'The Illusionists',
            activities: ['magic', 'card tricks', 'illusions'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: '97239'
                },
                attendance: 8160,
                weather: {
                    temperature: '65',
                    sunset: '6pm'
                },
            }]
        };

        const tour = new Tour(data);
        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), data);  
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected errors but got none');
        return validation.errors;
    };

    it('title is require field', () => {
        const tour = new Tour({});
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('attendance must be at least 1', () => {
        const tour = new Tour({ 
            stops:[{
                attendance: 0
            }] 
        });
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});
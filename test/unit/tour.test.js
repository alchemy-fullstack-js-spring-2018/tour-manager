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

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors but got none');
        return validation.errors;
    };

    it('has default date of now', () => {
        const tour = new Tour({ title: 'circus' });
        assert.ok(tour.launchDate);
        assert.isAtMost(tour.launchDate - Date.now(), 5);

    });

    it('title is require field', () => {
        const tour = new Tour({});
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('attendance must be at least 1', () => {
        const tour = new Tour({ 
            title: 'test',
            stops:[{
                attendance: 0
            }] 
        });
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});
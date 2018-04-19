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
        assert.isUndefined(tour.validateSync());
    });

    it('default date is now', () => {
        const tour = new Tour({});
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

    it('attendance min is 1', () => {
        const badAttendance = {
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
                attendance: 0
            }]
        };
        const tour = new Tour(badAttendance);
        const errors = getValidationErrors(tour.validateSync());
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});
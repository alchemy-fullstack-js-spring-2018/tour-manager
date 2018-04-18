const { assert } = require('chai');
const Circus = require('../../lib/models/Circus');

describe('circus model', () => {

    it('valid good model', () => {
        const data = {
            title: 'Monty Python\'s Flying',
            activities: ['british humor', 'math'],
            launched: new Date(),
        };

        const circus = new Circus(data);

        data.stops = [];
        data._id = circus._id;
        assert.deepEqual(circus.toJSON(), data);

        assert.isUndefined(circus.validateSync());
    });

    it('has default date of now', () => {
        const circus = new Circus({ name: 'bob' });
        assert.ok(circus.launched);
        assert.isAtMost(circus.launched - Date.now(), 5);
    });

    it('required fields', () => {
        const circus = new Circus({});
        const { errors } = circus.validateSync();
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('activity length', () => {
        const circus = new Circus({
            activities: ['AxAZGgar1V0x0fdMwwgQnKiGHRAL2zJbFWnBkhYoytQ0Xh1trX0otTci5Gmsv6WhkrEBHARzzqnPSKg0zjfk8AvdoDQTjNNzF45V44']
        });
        const { errors } = circus.validateSync();
        assert.equal(Object.keys(errors).length, 2);
        assert.equal(errors['activities.0'].kind, 'maxlength');
    });
});
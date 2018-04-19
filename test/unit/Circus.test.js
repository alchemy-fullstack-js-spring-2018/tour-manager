const { assert } = require('chai');
const Circus = require('../../lib/models/Circus');
const findZip = require('../../lib/util/find-zip');

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

    it('attendence at least 1', () => {
        const circus = new Circus({
            stops: [
                { attendence: 0 },
            ]
        });
        const { errors } = circus.validateSync();
        assert.equal(errors['stops.0.attendence'].kind, 'min');
    });

    it('stop at known state, zip required', () => {
        const circus = new Circus({
            stops: [
                { location: {
                    state: 'IG'
                } },
            ]
        });
        const { errors } = circus.validateSync();
        assert.equal(errors['stops.0.location.state'].kind, 'enum');
        assert.equal(errors['stops.0.location.zip'].kind, 'required');

    });

    it('weather data formatting', () => {
        const circus = new Circus({
            stops: [
                { weather: {
                    temperature: '4004 F',
                    percipitation: true,
                    wind: false
                } },
            ]
        });
        const { errors } = circus.validateSync();
        assert.equal(errors['stops.0.weather.temperature'].kind, 'maxlength');
    });

    it('tests middleware', () => {
        const location = {};
        const weather = {};
        const zip = '97030';
        const api = zip => {
            api.zip = zip;
            return Promise.resolve({ weather, location });
        };
        
        const middleware = findZip(api);

        const req = {
            body: { zip }
        };

        const next = () => {
        
            assert.deepEqual(api.zip.zip, zip);
            assert.equal(req.body.weather, weather);
        };
        
        middleware(req, null, next);

    });
    
});
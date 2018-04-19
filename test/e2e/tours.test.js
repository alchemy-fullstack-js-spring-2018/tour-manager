const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    before(() => dropCollection('tours'));

    let volta = {
        title: 'VOLTA',
        activities: ['street sports', 'gameshow', 'acrobatics'],
        stops: []
    };

    let corteo = {
        title: 'Corteo',
        activities: ['clowns', 'acrobatics'],
        stops: []
    };

    it('it saves a tour', () => {
        return request.post('/tours')
            .send(volta)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(body, { _id, __v, launchDate, ...volta });
                volta = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets a tour by id', () => {
        return Tour.create(corteo)
            .then(roundTrip)
            .then(saved => {
                corteo = saved;
                return request.get(`/tours/${corteo._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, corteo);
            });
    });

    it('update a tour by id', () => {
        volta.activities = ['street sports', 'acrobatics'];

        return request.put(`/tours/${volta._id}`)
            .send(volta)
            .then(({ body }) => {
                assert.deepEqual(body, volta);
                return Tour.findById(volta._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, volta);
            });
    });

    it('gets all tours', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [volta, corteo]);
            });
    });
});


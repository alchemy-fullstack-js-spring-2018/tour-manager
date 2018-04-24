const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    before(() => dropCollection('tours'));

    let tour1 = {
        name: 'The Best Tour of Ever',
        activities: ['Bowling', 'Knife Throwing'],
        stops: []
    };

    let tour2 = {
        name: 'Reign of the Circus Tour',
        activities: ['Loop Jumping', 'Metal Punching'],
        stops: []
    };

    it('POST - saves a tour', () => {
        return request.post('/tours')
            .send(tour1)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(body, { _id, __v, launchDate, ...tour1 });
                tour1 = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('GET - a tour by ID', () => {
        return Tour.create(tour2).then(roundTrip)
            .then(saved => {
                tour2 = saved;
                return request.get(`/tours/${tour2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, tour2);
            });
    });

    it('PUT - update a tour', () => {
        tour2.name = 'Further Reign of the Circus Tour';

        return request.put(`/tours/${tour2._id}`)
            .send(tour2)
            .then(({ body }) => {
                assert.deepEqual(body, tour2);
                return Tour.findById(tour2._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, tour2);
            });
    });

    it('GET - all tours', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [tour1, tour2]);
            });
    });

    it('DELETE - a tour', () => {
        return request.delete(`/tours/${tour1._id}`)
            .then(() => {
                return Tour.findById(tour1._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('POST - add new stop', () => {
        return request.post(`/tours/${tour2._id}/stops?zip=97205`)
            .then(({ body })  => {
                assert.equal(body.stops[0].location.city, 'Portland');
                tour2 = body;
            });
    });

    it('PUT - update attendance of stop', () => {
        tour2.stops[0].attendance = 2000;
        return request.put(`/tours/${tour2._id}/stops/${tour2.stops[0]._id}/attendance`)
            .send(tour2)
            .then(({ body }) => {
                assert.equal(body.attendance, 2000);
            });
    });

    it('DELETE - a stop', () => {
        return request.delete(`/tours/${tour2._id}/stops/${tour2.stops[0]._id}`)
            .then(() => {
                return request.get(`/tours/${tour2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body.stops, []);
            });
    });

});
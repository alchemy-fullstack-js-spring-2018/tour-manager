const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');
const { checkOk } = request;

describe('Tour API', () => {

    before(() => dropCollection('tours'));

    let tour1 = {
        title: 'Carnival',
        activities: ['juggling', 'trapeze', 'fire breathing'],
        stops: []
    };

    let tour2 = {
        title: 'Carnival 2',
        activities: ['juggling', 'trapeze', 'fire breathing'],
        stops: []
    };

    it('saves a tour', () => {
        return request.post('/tours')
            .send(tour1)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(body, {
                    _id, __v, launchDate,
                    ...tour1
                });
                tour1 = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets a tour by id', () => {
        return Tour.create(tour2).then(roundTrip)
            .then(saved => {
                tour2 = saved;
                return request.get(`/tours/${tour2._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, tour2);
            });
    });

    it('updates a tour', () => {
        tour2.title = 'Carnival 2.0';

        return request.put(`/tours/${tour2._id}`)
            .send(tour2)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, tour2);
                return Tour.findById(tour2._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, tour2);
            });
    });

    const getFields = ({ _id, title, activities }) => ({ _id, title, activities });

    it('gets all tours but only _id, title, and activities', () => {
        return request.get('/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [tour1, tour2].map(getFields));
            });
    });

    it('deletes a tour', () => {
        return request.delete(`/tours/${tour2._id}`)
            .then(checkOk)
            .then(() => {
                return Tour.findById(tour2._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('returns 404 on get of non-existent id', () => {
        return request.get(`/tours/${tour2._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, /^Tour id/);
            });
    });

    describe('Tour stops API', () => {

        let stop1 = {

            location: {
                city: 'Conifer',
                state: 'Colorado',
                zip: '80433'
            },
            weather: {
                temperature: '45',
                condition: 'Snow Flurries'
            },
            attendance: 200
        };

        it('adds a stop to tour1', () => {

            return request.post(`/tours/${tour1._id}/stops`)
                .send(stop1)
                .then(checkOk)
                .then(({ body }) => {
                    assert.ok(body._id);
                    assert.deepEqual(body, { _id: body._id, ...stop1 });
                    stop1 = body;
                });
        });

        it('updates a stop', () => {
            stop1.attendance = 300;

            return request.put(`/tours/${tour1._id}/stops/${stop1._id}`)
                .send(stop1)
                .then(checkOk)
                .then(() => {
                    return Tour.findById(tour1._id).select('stops');
                })
                .then(tour => {
                    assert.equal(tour.stops[0].attendance, stop1.attendance);
                });
        });

    });

});
const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/tour');
const { dropCollection } = require('./db');

describe('tour api', () => {
    
    before(() => dropCollection('tours'));

    let tourA = {
        title: 'tour test',
        activities: ['knife juggling', 'fire eating', 'clowns'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: '97221'
            },
            weather: {
                temperature: '60',
                sunset: '7pm'
            },
            attendance: 15
        }]
    };
    
    let tourB = {
        title: 'tourB',
        activities: ['juggling', 'fire eating', 'clowns'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Seattle',
                state: 'WA',
                zip: '98101'
            },
            weather: {
                temperature: '55',
                sunset: '3pm'
            },
            attendance: 20
        }]
    };

    it('saves and gets a tour', () => {
        return request.post('/tours')
            .send(tourA)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                tourA.stops[0]._id = body.stops[0]._id;
                assert.ok(_id);
                assert.deepEqual(body, {
                    _id, __v, 
                    ...tourA,
                    launchDate
                });
                tourA = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets tour by id', () => {
        return Tour.create(tourB).then(roundTrip)
            .then(saved => {
                tourB = saved;
                return request.get(`/tours/${tourB._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, tourB);
            });
    });

    it('update tour', () => {
        tourA.title = 'New title';

        return request.put(`/tours/${tourA._id}`)
            .send(tourA)
            .then(({ body }) => {
                assert.deepEqual(body, tourA);
                return Tour.findById(tourA._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, tourA);
            });
    });

    it('gets all tours', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [tourA, tourB]);
            });
    });

    it('deletes tour', () => {
        return request.delete(`/tours/${tourB._id}`)
            .then(() => {
                return Tour.findById(tourB._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });




    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    describe('tour stops', () => {
        const stop = {
            location: {
                city: 'LA',
                state: 'CA',
                zip: '90210'
            },
            weather: {
                temperature: '100',
                sunset: '8pm'
            },
            attendance: 100
        };

        it('adds a stop', () => {
            return request.post(`/tours/${tourA._id}/stops`)
                .send(stop)
                .then(checkOk)
                .then(({ body }) => {
                    assert.isDefined(body._id);
                    stop._id = body._id;
                    assert.deepEqual(body, stop);

                    return Tour.findById(tourA._id).then(roundTrip);
                })
                .then(({ stops }) => {
                    assert.deepEqual(stops[1], stop)
                });
        });

        it('updates stop', () => {
            stop.attendance = 50;
            return request.put(`/tours/${tourA._id}/stops/${stop._id}`)
                .send(stop)
                .then(checkOk)
                .then(({ body }) => {
                    assert.equal(body.attendance, stop.attendance);
                });
        });

    });
});
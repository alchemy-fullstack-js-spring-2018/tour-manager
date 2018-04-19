const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Clown Tour API', () => {

    before(() => dropCollection('tours'));

    let clownFiesta = {
        title: 'Clown Fiesta',
        activities: ['Clown Boxing', 'Pumpkin Smashing', 'Air Ukelele'],
        stops: []
    };

    let clownParty = {
        title: 'Clown Party',
        activities: ['Clown Hurdles', 'Dunk Contest', 'Clown Arm Wrestling'],
        stops: []
    };

    it('saves a tour', () => {
        return request.post('/tours')
            .send(clownFiesta)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.ok(launchDate);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v, launchDate,
                    ...clownFiesta
                }),
                clownFiesta = body;
            });
    });
    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets tour by id', () => {
        return Tour.create(clownParty).then(roundTrip)
            .then(saved => {
                clownParty = saved;
                return request.get(`/tours/${clownParty._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, clownParty);
            });
    });

    it('updates tour', () => {
        clownParty.title = 'Clown Siesta';

        return request.put(`/tours/${clownParty._id}`)
            .send(clownParty)
            .then(({ body }) => {
                assert.deepEqual(body, clownParty);
                return Tour.findById(clownParty._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, clownParty);
            });
    });

    const getFields = ({ _id, title, activities, stops }) => ({ _id, title, activities, stops });

    it('gets all tours but only specific fields', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [clownFiesta, clownParty].map(getFields));
            });
    });

    it('deletes a tour', () => {
        return request.delete(`/tours/${clownParty._id}`)
            .then(() => {
                return Tour.findById(clownParty._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    describe('Tour stops API', () => {

        let seattle = {
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
        };

        it('Adds a stop', () => {
            return request.post(`/tours/${clownFiesta._id}/stops`)
                .send(seattle)
                .then(checkOk)
                .then(({ body }) => {
                    assert.ok(body._id);
                    assert.deepEqual(body, { _id: body._id, ...seattle });
                    seattle = body;
                });

        });

        it('updates a stop', () => {
            seattle.attendance = 15;

            return request.put(`/tours/${clownFiesta._id}/stops/${seattle._id}`)
                .send(seattle)
                .then(checkOk)
                .then(({ body }) => {
                    console.log('body', body);
                    assert.equal(body.attendance, seattle.attendance);

                });
        });

        it('removes a stop', () => {
            return request.delete(`/tours/${clownFiesta._id}/stops/${seattle._id}`)
                .then(checkOk)
                .then(() => {
                    return Tour.findById(clownFiesta._id).then(roundTrip);
                })
                .then(({ stops }) => {
                    assert.deepEqual(stops, []);
                });
        });

    });


});
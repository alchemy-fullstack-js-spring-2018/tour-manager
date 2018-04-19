const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tours API', () => {
    before(() => dropCollection('tours'));

    let spring = {
        title: 'Spring swing',
        activities: ['fire-breathing', 'acrobatics', 'lion snuggling'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Gary',
                state: 'IN'
            },
            weather: {
                temperature: 102,
            },
            attendance: 27890
        }]
    };
    let fall = {
        title: 'Fallsout Tour',
        activities: ['goat-taming', 'dancing bears', 'lion snuggling'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Boston',
                state: 'MA'
            },
            weather: {
                temperature: 22,
            },
            attendance: 356
        }]
    };

    it('saves and gets a tour', () => {
        return request.post('/tours')
            .send(spring)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                spring.launchDate = launchDate;
                spring.stops[0]._id = body.stops[0]._id;
                assert.ok(_id);
                assert.ok(launchDate);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, launchDate, ...spring });
                spring = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));
    const getFields = ({ _id, title, launchDate }) => ({ _id, title, launchDate });
    it('gets a tour by id', () => {
        return Tour.create(fall).then(roundTrip)
            .then(saved => {
                fall = saved;
                return request.get(`/tours/${fall._id}`);
            })
            .then(({ body }) => {
                fall.stops[0]._id = body.stops[0]._id;
                assert.deepEqual(body, fall);
            });
    });

    it('gets all tours, returns id, title, launchDate', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [spring, fall].map(getFields));
            });
    });

    it('queries tours', () => {
        return request.get('/tours?title=Fallsout Tour')
            .then(({ body }) => {
                assert.deepEqual(body, [fall].map(getFields));
            });
    });

    it('but does it query for items in an array? YES IT DOES!', () => {
        return request.get('/tours?activities=fire-breathing')
            .then(({ body }) => {
                assert.deepEqual(body, [spring].map(getFields));
            });
    });

    // how do you query for a city?

    it('updates a tour', () => {
        spring.title = 'Springy';

        return request.put(`/tours/${spring._id}`)
            .send(spring)
            .then(({ body }) => {
                assert.deepEqual(body, spring);
                return Tour.findById(spring._id).then(roundTrip)
            })
            .then(updated => {
                assert.deepEqual(updated, spring);
            });
    });

    it('deletes a tour', () => {
        return request.delete(`/tours/${spring._id}`)
            .then(() => {
                return Tour.findById(spring._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    describe('Tour Stops API', () => {

        const stop2 = {
            location: {
                city: 'Savannah',
                state: 'GA'
            },
            weather: {
                temperature: 75,
            },
            attendance: 428
        };

        it('adds a stop', () => {
            return request.post(`/tours/${fall._id}/stops`)
                .send(stop2)
                .then(checkOk)
                .then(({ body }) => {
                    assert.isDefined(body._id);
                    stop2._id = body._id;
                    assert.deepEqual(body, stop2);
                    return Tour.findById(fall._id).then(roundTrip);
                })
                .then(({ stops }) => {
                    assert.deepEqual(stops, [fall.stops[0], stop2]);
                });
        });
    });

    
});
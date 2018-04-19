const { assert } = require('chai');
const request = require('./request');
const Circus = require('../../lib/models/Circus');
const { dropCollection } = require('./db');
const { checkOk } = request;

describe('Circus API', () => {

    before(() => dropCollection('circus'));

    let montyPython = {
        title: 'Monty Python\'s Flying',
        activities: ['british humor', 'surrealism', 'religious quests'],
        launched: new Date(1969, 10, 19, 7, 30, 0, 0),
        stops: [],
    };

    let smirkus = {
        title: 'Smirkus',
        activities: ['trapeze', 'creepy children'],
        stops: [],
    };

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('saves and gets a circus', () => {
        return request.post('/tours')
            .send(montyPython)
            .then(checkOk)
            .then(({ body }) => {
                let { _id, __v, launched } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launched);
                assert.deepEqual(body, {
                    ...montyPython,
                    _id, __v, launched
                });
                montyPython = body;
            });
    });

    it('gets a circus by id', () => {
        return Circus.create(smirkus).then(roundTrip)
            .then(saved => {
                smirkus = saved;
                return request.get(`/tours/${smirkus._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, smirkus);
            });
    });

    it('update a circus', () => {
        smirkus.activities[1] = 'clowns';

        return request.put(`/tours/${smirkus._id}`)
            .send(smirkus)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, smirkus);
                return Circus.findById(smirkus._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, smirkus);
                smirkus = updated;
            });
    });

    it('deletes a circus', () => {
        return request.delete(`/tours/${smirkus._id}`)
            .then(checkOk)
            .then(() => {
                return Circus.findById(smirkus._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('returns 404 on get of non-existent id', () => {
        return request.get(`/tours/${smirkus._id}`)
            .then(response => {
                assert.equal(response.status, 404);
            });
    });

    describe('Circus Stops API', () => {

        const comfy = { 
            location : {
                city: 'Comfy Chair',
                zip: '97030'
            },
            attendence: 42 };

        it('Adds a stop', () => {
            return request.post(`/tours/${montyPython._id}/stops`)
                .send(comfy)
                .then(checkOk)
                .then(({ body }) => {
                    assert.isDefined(body._id);
                    comfy._id = body._id;
                    assert.deepEqual(body, comfy);

                    return request.get(`/tours/${montyPython._id}`);
                })
                .then(({ body }) => {
                    assert.deepEqual(body.stops, [comfy]);
                });
        });

        // it('Updates a stop', () => {
        //     weapon.damage = 16;
        //     return request.put(`/pirates/${luffy._id}/weapons/${weapon._id}`)
        //         .send(weapon)
        //         .then(checkOk)
        //         .then(({ body }) => {
        //             assert.equal(body.damage, weapon.damage);
        //         });
        // });

        // it('Removes a stop', () => {
        //     return request.delete(`/pirates/${luffy._id}/weapons/${weapon._id}`)
        //         .then(checkOk)
        //         .then(() => {
        //             return request.get(`/pirates/${luffy._id}`);                    
        //         })
        //         .then(({ body }) => {
        //             assert.deepEqual(body.weapons, []);
        //         });
        // });
    });
});
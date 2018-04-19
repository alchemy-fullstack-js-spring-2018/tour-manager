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

    // let zoro = {
    //     name: 'Roronoa Zoro',
    //     role: 'crew',
    //     crew: 'Straw Hats',
    //     wardrobe: {
    //         shoes: 'boots'
    //     },
    //     weapons: []
    // };

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
});
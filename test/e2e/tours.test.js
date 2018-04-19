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

});
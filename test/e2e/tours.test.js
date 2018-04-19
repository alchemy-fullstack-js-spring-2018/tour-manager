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
});
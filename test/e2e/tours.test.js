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

});
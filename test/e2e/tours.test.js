const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {
    before(() => dropCollection('tours'));

    let moMy = {
        title: 'Mongo Mystique',
        activities: ['curly brace juggling', 'id clowning', 'dollar sign magic', 'schema swallowing'],
        stops: []
    };

    let maMo = {
        title: 'Marvelous Mongoose',
        activities: ['data type taming', 'document contortion'],        
        stops: []
    };

    it('saves and gets a tour (POST)', () => {
        return request.post('/tours')
            .send(moMy)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(body, {
                    _id, __v, launchDate, ...moMy
                });
                moMy = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    const getFields = ({ _id, title, launchDate }) => ({ _id, title, launchDate });

    it('gets all tours, returning a subset of fields (GET)', () => {
        return Tour.create(maMo).then(roundTrip)
            .then(saved => {
                maMo = saved;
                return request.get('/tours');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [moMy, maMo].map(getFields));
            });
    });

    it('gets a tour by id (GET)', () => {
        return request.get(`/tours/${moMy._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, moMy);
            });
    });

    it('updates a tour (PUT)', () => {
        maMo.activities = ['data type taming', 'document contortion', 'validation feats of strength'];

        return request.put(`/tours/${maMo._id}`)
            .send(maMo)
            .then(({ body }) => {
                assert.deepEqual(body, maMo);
                return Tour.findById(maMo._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, maMo);
            });
    });

    it('deletes a tour (DELETE)', () => {
        return request.delete(`/tours/${moMy._id}`)
            .then(() => {
                return Tour.findById(moMy._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });
}); 
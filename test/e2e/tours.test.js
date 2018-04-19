const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {
    before(() => dropCollection('tours'));

    let moMy = {
        title: 'Mongo Mystique',
        activities: ['curly brace juggling', 'id clowning', 'dollar sign magic', 'schema swallowing'],
        launchDate: new Date(),
        stops: []
    };

    let maMo = {
        title: 'Marvelous Mongoose',
        activities: ['data type taming', 'document contortion'],        
        stops: []
    };

    it('saves and gets a tour', () => {
        return new Tour(moMy).save()
            .then(saved => {
                saved = saved.toJSON();
                const { _id, __v, launchDate } = saved;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(saved, {
                    _id, __v, launchDate,
                    ...moMy
                });
                moMy = saved;
                return Tour.findById(saved._id).lean();
            })
            .then(found => {
                assert.deepEqual(found, moMy);
            });
    });
}); 
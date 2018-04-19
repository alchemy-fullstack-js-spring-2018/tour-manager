const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    before(() => dropCollection('tours'));

    let volta = {
        title: 'VOLTA',
        activities: ['street sports', 'gameshow', 'acrobatics'],
        // launchDate: new Date(),
        stops: []
    };

    // it('it saves a tour', () => {
    //     return new Tour(volta).save()
    //         .then(saved => {
    //             saved = saved.toJSON();
    //             const { _id, __v, launchDate } = saved;
    //             assert.ok(_id);
    //             assert.equal(__v, 0);
    //             assert.ok(launchDate);
    //             assert.deepEqual(saved, { _id, __v, launchDate, ...volta });
    //             volta = saved;
    //             return Tour.findById(saved._id).lean();
    //         })
    //         .then(found => {
    //             assert.deepEqual(found, volta);
    //         });
    // });

    // it('it saves a tour', () => {
    //     return request.post('/tours')
    //         .send(volta)
    //         .then(({ body }) => {
    //             const { _id, __v, launchDate } = body;
    //             assert.ok(_id);
    //             assert.equal(__v, 0);
    //             assert.ok(launchDate);
    //             assert.deepEqual(body, { _id, __v, launchDate, ...volta });
    //             volta = body;
    //         });
    // });
});
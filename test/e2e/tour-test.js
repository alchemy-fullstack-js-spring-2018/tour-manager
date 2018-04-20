const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { checkOk } = request;
describe('e2e testing for flea circus', () => {

    before(() => dropCollection('tours'));

    let circus1 = {
        title: 'Scintillating Sea Monkeys Spectacular!',
        activities: ['high dive', 'aquarium', 'kiddie pool'],
        stops: []
    };

    let circus2 = {
        title: 'Racing Roach Derby',
        activities: ['roach race', 'snack bar', 'garbage'],
        launchDate: new Date(2011, 11, 25, 7, 30, 0, 0),
        stops: []
    };

    const comeBack = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('saves and gets a circus maybe', () => {
        return request.post('/tours')
            .send(circus1)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(body, {
                    ...circus1,
                    _id, __v, launchDate
                });
                circus1 = body;
            });
    });

    it('gets specific tour info by id', () => {
        return request.post('/tours')
            .send(circus2)
            .then(checkOk)
            .then(({ body }) => {
                circus2 = body;
                return request.get(`/tours/${circus2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, circus2);
            });
    });
});
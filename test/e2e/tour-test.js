const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/tour');
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

    const getFields = ({ _id, title }) => ({ _id, title });

    it('gets all tours by id and title', () => {
        return request.get('/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [circus1, circus2].map(getFields));
            });
    });
    it('update a circus', () => {
        circus2.activities[2] = 'bounce house';

        return request.put(`/tours/${circus2._id}`)
            .send(circus2)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, circus2);
                return Tour.findById(circus2._id).then(comeBack);
            })
            .then(updated => {
                assert.deepEqual(updated, circus2);
                circus2 = updated;
            });
    });

    it('deletes a circus', () => {
        return request.delete(`/tours/${circus1._id}`)
            .then(checkOk)
            .then(() => {
                return Tour.findById(circus1._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });
});

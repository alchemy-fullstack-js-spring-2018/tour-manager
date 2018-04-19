const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');

describe.skip('tour api', () => {
    
    before(() => dropCollection('tours'));

    let tourTest = {
        title: 'tour test',
        activities: ['magic', 'card tricks', 'illusions'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Portland',
                state: 'OR',
                zip: '97239'
            },
            attendance: 6000,
            weather: {
                temperature: '60',
                sunset: '7pm'
            },
        }]
    };

    it('saves and gets a tour', () => {
        return request.post('/tours')
            .send(tourTest)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                tourTest.stops[0]._id = body.stops[0]._id;
                assert.ok(_id);
                assert.deepEqual(body, {
                    _id, __v, 
                    ...tourTest,
                    launchDate
                });
                tourTest = body;
            });
    });
});
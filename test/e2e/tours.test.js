const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {
    before(() => dropCollection('tours'));

    let tourData = {
        title: 'The Test Tour',
        activities: ['testing models', 'testing validations', 'testing testing'],
        launchDate: new Date('January 1, 1900 00:00:00'),
        stops: [{
            location: {
                city: 'Portland',
                state: 'OR',
                zip: '97205'
            },
            weather: {
                condition: 'Sunny',
                windSpeed: '5mph',
                sunset: 'Like 6 or whatever',
            }
        }]
    };

    it('Saves and retrieves a tour', () => {
        return request.post('/tours')
            .send(tourData)
            .then(( { body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                tourData.stops[0]._id = body.stops[0]._id;
                assert.deepEqual(body, {
                    ...tourData, _id, __v, launchDate
                });
                tourData = body;
            });
    });
});
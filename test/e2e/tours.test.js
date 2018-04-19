const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/tour');
const { dropCollection } = require('./db');

describe('tour api', () => {
    
    before(() => dropCollection('tours'));

    let tourA = {
        title: 'tour test',
        activities: ['knife juggling', 'fire eating', 'clowns'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: '97221'
            },
            weather: {
                temperature: '60',
                sunset: '7pm'
            },
            attendance: 15
        }]
    };
    
    let tourB = {
        title: 'tourB',
        activities: ['juggling', 'fire eating', 'clowns'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Seattle',
                state: 'WA',
                zip: '98101'
            },
            weather: {
                temperature: '55',
                sunset: '3pm'
            },
            attendance: 20
        }]
    };

    it('saves and gets a tour', () => {
        return request.post('/tours')
            .send(tourA)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                tourA.stops[0]._id = body.stops[0]._id;
                assert.ok(_id);
                assert.deepEqual(body, {
                    _id, __v, 
                    ...tourA,
                    launchDate
                });
            });
    });


});
const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {
    before(() => dropCollection('tours'));

    let woodstock = {
        title: 'Woodstock 2',
        activities: ['mud', 'drugs', 'more drugs'],
        launchDate: new Date('July 1, 2018 00:00:00'),
        stops: [{
            location: {
                city: 'White Lake',
                state: 'NY',
                zip: '97205'
            },
            weather: {
                condition: 'Sunny',
                windSpeed: '5mph',
                sunset: 'Like 6 or whatever',
            }
        }]
    };

    let ozfest = {
        title: 'Ozfest',
        activities: ['worshopping the devil', 'head banging'],
        launchDate: new Date('October 1, 2018 00:00:00'),
        stops: [{
            location: {
                city: 'Portland',
                state: 'OR',
                zip: '97205'
            },
            weather: {
                condition: 'dreary',
                windSpeed: '5mph',
                sunset: 'Like 9',
            }
        }]
    };

    it('Saves and retrieves a tour', () => {
        return request.post('/tours')
            .send(woodstock)
            .then(( { body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                woodstock.stops[0]._id = body.stops[0]._id;
                assert.deepEqual(body, {
                    ...woodstock, _id, __v, launchDate
                });
                woodstock = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('Gets a tour by id', () => {
        return Tour.create(ozfest).then(roundTrip)
            .then(saved => {
                ozfest = saved;
                return request.get(`/tours/${ozfest._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, ozfest);
            });
    });
});
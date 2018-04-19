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
        activities: ['worshipping the devil', 'head banging'],
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

    it('Updates a tour', () => {
        ozfest.title = 'Ozfest 2018';

        return request.put(`/tours/${ozfest._id}`)
            .send(ozfest)
            .then(({ body }) => {
                assert.deepEqual(body, ozfest);
                return Tour.findById(ozfest._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, ozfest);
            });
    });

    const getFields = ({ _id, title, launchDate, activities}) => ({ _id, title, launchDate, activities});

    it('Gets all tours, but only specific properties', () => {
        return request.get('/tours')
            .then(( { body }) => {
                assert.deepEqual(body, [woodstock, ozfest].map(getFields));
            });
    });

    it('Queries tours', () => {
        return request.get('/tours?title=Ozfest%202018')
            .then(( { body }) => {
                assert.deepEqual(body, [ozfest].map(getFields));
            });
    });

    it('Deletes a tour', () => {
        return request.delete(`/tours/${ozfest._id}`)
            .then(() => {
                return Tour.findById(ozfest._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('Successful 404 functionality', () =>{
        return request.get(`/tours/${ozfest._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, /^Pirate id/);
            });
    });
});
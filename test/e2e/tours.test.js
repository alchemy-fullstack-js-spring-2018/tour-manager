const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');
const Tour = require('../../lib/models/tourSchema');

describe('tour api', () => {
    
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

    let tourA = {
        title: 'second tour test',
        activities: ['fighting', 'swords', 'fire'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Tualatin',
                state: 'OR',
                zip: '97062'
            },
            attendance: 200,
            weather: {
                temperature: '65',
                sunset: '6pm'
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

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets tour by id', () => {
        return Tour.create(tourA).then(roundTrip)
            .then(saved => {
                tourA = saved;
                return request.get(`/tours/${tourA._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, tourA);
            });
    });

    it('updates tour', () => {
        tourTest.title = 'New tour';

        return request.put(`/tours/${tourTest._id}`)
            .send(tourTest)
            .then(({ body }) => {
                assert.deepEqual(body, tourTest);
                return Tour.findById(tourTest._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, tourTest);
            });
    });

    it('gets all tours', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [tourTest, tourA]);
            });
    });
});
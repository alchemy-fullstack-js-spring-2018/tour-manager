const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    const volta = {
        title: 'VOLTA',
        activities: ['street sports', 'gameshow', 'acrobatics'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: '99999'
            },
            weather: {
                temperature: '73',
                condition: 'sunny',
                windSpeed: '10',
                windDir: 'north',
                sunrise: '6:30',
                sunset: '6:30'
            },
            attendence: 100
        }]
    };

    it('it saves a tour', () => {
        return new Tour(volta).save()
            .then(saved => {
                const { _id, __v } = saved;
                assert.ok(_id);
                assert.equal(__v, 0);
            });
    });
});
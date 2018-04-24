const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    before(() => dropCollection('tours'));

    let volta = {
        title: 'VOLTA',
        activities: ['street sports', 'gameshow', 'acrobatics'],
        stops: []
    };

    let corteo = {
        title: 'Corteo',
        activities: ['clowns', 'acrobatics'],
        stops: []
    };

    it('it saves a tour', () => {
        return request.post('/tours')
            .send(volta)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(launchDate);
                assert.deepEqual(body, { _id, __v, launchDate, ...volta });
                volta = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets a tour by id', () => {
        return Tour.create(corteo)
            .then(roundTrip)
            .then(saved => {
                corteo = saved;
                return request.get(`/tours/${corteo._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, corteo);
            });
    });

    it('update a tour by id', () => {
        volta.activities = ['street sports', 'acrobatics'];

        return request.put(`/tours/${volta._id}`)
            .send(volta)
            .then(({ body }) => {
                assert.deepEqual(body, volta);
                return Tour.findById(volta._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, volta);
            });
    });

    it('gets all tours', () => {
        return request.get('/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [volta, corteo]);
            });
    });

    it('queries tours', () => {
        return request.get('/tours?title=VOLTA')
            .then(({ body }) => {
                assert.deepEqual(body, [volta]);
            });
    });

    it('deletes a tour', () => {
        return request.delete(`/tours/${corteo._id}`)
            .then(() => {
                return Tour.findById(corteo._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('returns 404 on get of non-existent id', () => {
        return request.get(`/tours/${corteo._id}`)
            .then(response => {
                // console.log('RES!!!!', response);
                assert.equal(response.status, 404);
            });
    });
    
    let newStop = { zip: '99362' };

    describe('Tour Stops API', () => {
    
        it('Adds a stop', () => {
            return request.post(`/tours/${volta._id}/stops`)
                .send(newStop)
                .then(({ body }) => {
                    console.log(body);
                    assert.ok(body._id);
                    assert.equal(body.location.city, 'Walla Walla');
                    assert.equal(body.location.state, 'WA');
                    assert.ok(body.weather.temperature);
                    assert.ok(body.weather.condition);
                    assert.ok(body.weather.sunrise);
                    assert.ok(body.weather.sunset);
                    newStop = body;
                    return Tour.findById(volta._id).then(roundTrip);
                })
                .then(({ stops }) =>{
                    assert.deepEqual(stops[0].location.zip, newStop.location.zip);
                });
        });

        it('updates a stop with attendance', () => {
            newStop.attendance = 17;

            return request.put(`/tours/${volta._id}/stops/${newStop._id}`)
                .send(newStop)
                .then(({ body }) => {
                    assert.equal(body.attendance, newStop.attendance);
                });
        });
        
    });
});

// stops: [{
//     location: {
//         city: String,
//         state: String,
//         zip: String
//     },
//     weather: {
//         temperature: String,
//         condition: String,
//         sunrise: String,
//         sunset: String
//     },
//     attendence: {
//         type: Number,
//         min: 1
//     }
// }]
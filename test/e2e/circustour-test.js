const { assert } = require('chai'); //require chai assertion library.
const request = require('./request'); //lets us open and close a server for our testing convienience.
const Circus = require('../../lib/models/circus-schema'); //we want to utilize our schema so we can create database.
const { dropCollection } = require('./db'); 
/*connects to our database! and the dropCollection method lets us empty our.
tables for each test we run, so we start with a clean slate each time.*/

describe('Basic Tour API CRUD tests', () => {

    before(() => dropCollection('circustour'));

    let LeCirque  = {
        title: 'Le Cirque',
        activities: 'Lion taming',
        launchDate: new Date(), //need date to tour.
        stops: []   
    };
    
    let  Imaginarium = {
        title: 'Imaginarium',
        activities: 'Fire dancing',
        launchDate: new Date(),
        stops: []

    };

    it('saving and getting a circus tour (post method)', () => {
        return request.post('/circustour')
            .send(LeCirque)
            .then(({ body }) => { //propeties of the body.
                const { _id, __v, launchDate } = body; //mongodb ads a _id to our body when we get it back
                assert.ok(_id);                 //_v is a version key, a version of your data, 
                assert.equal(__v, 0);               //these properties were not there when it was sent, but when it came back from our database
                assert.ok(launchDate);              //in mongodb they now have these properties.
                assert.deepEqual(body, {
                    ...LeCirque,
                    _id, __v, launchDate,
                });
                LeCirque = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('get circustour by id', () => {
        return Circus.create(Imaginarium)
            .then(roundTrip)
            .then(saved => {
                Imaginarium = saved;
                return request.get(`/circustour/${Imaginarium._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, Imaginarium);
            });
    });

    it('update circustour by id', () => {
        LeCirque.title = 'Le Crousant';

        return request.put(`/circustour/${LeCirque._id}`)
            .send(LeCirque)
            .then(({ body }) => {
                assert.deepEqual(body, LeCirque);
                return Circus.findById(LeCirque._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, LeCirque);
            });
    });

    const getFields = ({ _id, title, launchDate }) => ({ _id, title, launchDate });

    it('get all circustours', () => {
        return request.get('/circustour')
            .then(({ body }) => {
                assert.deepEqual(body, [LeCirque, Imaginarium].map(getFields)); //need to return both as array.
            });
    });

});
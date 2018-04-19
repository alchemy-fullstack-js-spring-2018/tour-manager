const { assert } = require('chai'); //require chai assertion library.
const request = require('./request'); //lets us open and close a server for our testing convienience.
// const Circus = require('../../lib/models/circus-schema'); //we want to utilize our schema so we can create database.
const { dropCollection } = require('./db'); 
/*connects to our database! and the dropCollection method lets us empty our.
tables for each test we run, so we start with a clean slate each time.*/

describe('Basic Tour API CRUD tests', () => {

    before(() => dropCollection('circustour'));

    let LeCirque  = {
        title: 'Le Cirque',
        activities: 'Lion taming',
        stops: []   
    };
    
    // let  Imaginarium = {
    //     title: 'Imaginarium',
    //     activities: 'Fire dancing',
    //     stops: []

    // };

    it('saving and getting a circus tour (post method)', () => {
        return request.post('/circustour')
            .send(LeCirque)
            .then(({ body }) => {
                const { _id, _v, joined } = body;
                assert.ok(_id);
                assert.equal(_v, 0);
                assert.ok(joined);
                assert.deepEqual(body, {
                    _id, _v, joined,
                    ...LeCirque
                });
                LeCirque = body;
            });
    });

});
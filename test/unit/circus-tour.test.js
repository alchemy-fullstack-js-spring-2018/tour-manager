
const { assert } = require('chai');
const CircusTour = require('../../lib/models/circusTour');

describe('Circus Tour', () => {


    it('valid model check', () => {
        const data = {
            title: 'Portland Magical Tour',
            activities: ['Bearded Lady', 'Sword Swallower', 'Fire Breather'],
            launchDate: new Date(),
            stops: [],
                
        };

        const circusTour = new CircusTour(data);
        data._id = circusTour._id;
        data.stops[0]._id = circusTour.stops[0]._id;

        assert.deepEqual(circusTour.toJSON(), data);

    });

    
});
const { assert } = require('chai');
const Circus = require('../../lib/models/Circus');

describe('circus model', () => {

    it('valid good model', () => {
        const data = {
            name: 'Monkey D. Luffy',
            role: 'captain',
            crew: 'Straw Hats',
            joined: new Date(),
            wardrobe: {
                hat: 'straw',
                top: 'red vest',
                bottom: 'trousers',
                shoes: 'flip flops'
            },
            bounty: 300000000,
            weapons: [{
                type: 'punch',
                damage: 14
            }]
        };

        const circus = new Circus(data);

        data._id = circus._id;
        data.weapons[0]._id = circus.weapons[0]._id;
        assert.deepEqual(circus.toJSON(), data);

        assert.isUndefined(circus.validateSync());
    });
});
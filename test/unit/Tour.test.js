const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {

    it('is a valid model', () => {
        const data = {
            title: 'Spring swing',
            activities: ['fire-breathing', 'acrobatics', 'lion snuggling'],
            launchDate: new Date(),
            stops: {
                location: {
                    city: 'Gary',
                    state: 
                }
            }
        };
    });
});
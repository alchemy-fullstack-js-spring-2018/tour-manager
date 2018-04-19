const router = require('express').Router();
const Tour = require('../models/Tour');
const { updateOptions } = require('../utils/mongoose-helper');

const check404 = (tour, id) => {
    if(!tour) {
        throw {
            status: 404,
            error: `Tour id ${id} does not exist`
        };
    }
};

module.exports = router
    .get('/', () => {
        // gets all
    })

    .get('/:id', () => {
        // gets one by id
    })

    .post('/', () => {
        // adds a tour
    })

    .put('/:id', () => {
        // updates a tour
    })

    .delete('/:id', () => {
        // deletes tour by id
    })

    .post('/:id/stops', () => {
        // adds a stop
        // uses zip to lookup info: use demo repo for more information
    })

    .delete('/:id/stops/:stopid', () => {
        // deletes a stop
    })

    .post('/:id/stops/:stopid/attendance', () => {
        // adds attendance after event
    });
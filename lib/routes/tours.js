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
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Tour.findById(id)
            .lean()
            .then(tour => {
                check404(tour, id);
                res.json(tour);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(tour => res.json(tour))
            .catch(next);
    });

// .get('/', () => {
//     // gets all
// })


// .delete('/:id', () => {
//     // deletes tour by id
// })

// .post('/:id/stops', () => {
//     // adds a stop
//     // uses zip to lookup info: use demo repo for more information
// })

// .delete('/:id/stops/:stopid', () => {
//     // deletes a stop
// })

// .post('/:id/stops/:stopid/attendance', () => {
//     // adds attendance after event
// });
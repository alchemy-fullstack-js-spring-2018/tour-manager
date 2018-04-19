const router = require('express').Router();
const Tour = require('../models/Tour');
const { updateOptions } = require('../utils/mongoose-helpers');

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
        const { id } = req.params;

        Tour.findByIdAndUpdate(id, req.body, updateOptions)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Tour.find(req.query)
            .lean()
            .then(tour => res.json(tour))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        const { id } = req.params;

        Tour.findByIdAndRemove(id)
            .then(removed => res.json({ removed }))
            .catch(next);
    });


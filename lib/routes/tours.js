const router = require('express').Router();
const Tour = require('../models/Tour');
const { updateOptions } = require('../util/mongoose-helpers');

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
                if(!tour) {
                    next({
                        status: 404,
                        error: `Tour id ${id} does not exist`
                    });
                }
                else res.json(tour);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(tour => res.json(tour))
            .catch(next);
    });
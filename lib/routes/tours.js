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
    })

    .get('/', (req, res, next) => {
        Tour.find(req.query)
            .lean()
            .select('title activities')
            .then(tours => res.json(tours))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    })

    .post('/:id/stops', (req, res, next) => {
        const { id } = req.params;

        Tour.findByIdAndUpdate(id, {
            $push: { stops: req.body }
        }, updateOptions)
            .then(tour => {
                if(!tour) {
                    next({
                        status: 404,
                        error: `Tour id ${id} does not exist`
                    });
                }
                res.json(tour.stops[tour.stops.length - 1]);
            })
            .catch(next);
    })


    .put('/:id/stops/:stopId', (req, res, next) => {
        const { body, params } = req;
        const { id, stopId } = params;

        Tour.findOneAndUpdate({ 
            'stops._id': stopId
        }, {
            $set: { 
                'stops.$.attendance': body.attendance 
            }
        }, updateOptions)
            .then(tour => {
                if(!tour) {
                    next({
                        status: 404,
                        error: `Tour id ${id} does not exist`
                    });
                }
                res.json();
            })
            .catch(next);
    });
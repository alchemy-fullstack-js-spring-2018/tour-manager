const router = require('express').Router();
const Tour = require('../models/Tour');
const { updateOptions } = require('../util/mongoose-helpers');

const check404 = (pirate, id) => {
    if(!pirate) {
        throw {
            status: 404,
            error: `Pirate id ${id} does not exist`
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
            .select('title activities stops')
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
            '_id': id, 'stops._id': stopId
        }, {
            $set: {
                'stops.$.location': body.location,
                'stops.$.weather': body.weather,
                'stops.$.attendance': body.attendance
            }
        }, updateOptions)
            .then(tour => {
                check404(tour, id);
                res.json(tour.stops.find(n => n._id == stopId));
            })
            .catch(next);
    })

    .delete('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;

        Tour.findByIdAndUpdate(id, {
            $pull: {
                stops: { _id: stopId }
            }
        }, updateOptions)
            .then(tour => {
                check404(tour, id);
                res.json();
            })
            .catch(next);
    });

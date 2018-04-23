const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const Tour = require('../models/Tour');
const { updateOptions } = require('../util/mongoose-helpers');
const locationEnhancer = require('../middleware/location-enhancer');
const wuAPI = require('../services/wu-api');

const check404 = (tour, id) => {
    if(!tour) {
        throw {
            status: 404,
            error: `Tour id ${id} not found`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Tour.find(req.query)
            .lean()
            .select('title launchDate')
            .then(tours => res.json(tours))
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
    })

    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    })

    .post('/:id/stops', locationEnhancer(wuAPI), (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, {
            $push: { stops: req.body }
        }, updateOptions)
            .then(tour => {
                res.json(tour.stops[tour.stops.length - 1]);
            })
            .catch(next);
    })

    .put('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;
        const { attendance } = req.body;

        Tour.findOneAndUpdate({
            _id: id, 'stops._id': stopId
        }, {
            $set: {
                'stops.$.attendance': attendance
            }
        }, updateOptions)
            .then(tour => {
                check404(tour, id);
                res.json(tour.stops.find(stop => stop._id == stopId));
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
            .then(updated => res.json({ updated }))
            .catch(next);
    });
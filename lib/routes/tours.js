const router = require('express').Router(); /* eslint-disable-line */
const Tour = require('../models/Tour');
const { updateOptions } = require('../utils/mongoose-helper');
const getWeatherLocation = require('../utils/get-weather-location');
const wuMiddleware = require('../utils/wu-middleware');

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
    })

    .get('/', (req, res, next) => {
        Tour.find(req.query)
            .lean()
            .select('title launchDate activities')
            .then(tours => res.json(tours))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    })

    .post('/:id/stops', wuMiddleware(getWeatherLocation), (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, {
            $push: { stops: req.body }
        }, updateOptions)
            .then(tour => {
                res.json(tour.stops[tour.stops.length - 1]);
            })
            .catch(next);
    })

    .put('/:id/stops/:stopId/attendance', (req, res, next) => {
        const { id, stopId } = req.params;
        const { attendance } = req.body;

        Tour.findOneAndUpdate({
            '_id': id, 'stops._id': stopId
        }, {
            $set: {
                'stops.$.attendance': attendance
            }
        }, updateOptions)
            .then(tour => {
                check404(tour, id);
                res.json(tour.stops.find(s => s._id == stopId)); /* eslint-disable-line */
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
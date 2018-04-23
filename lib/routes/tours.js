const router = require('express').Router();
const Tour = require('../models/Tour');
const { updateOptions } = require('../util/mongoose-helpers');
// const getWeather = require('../util/get-weather-location');
// const appendWeather = require('../util/getWeather');

const check404 = (tour, id) => {
    if(!tour) {
        throw {
            status: 404,
            error: `Tour ID ${id} Does Not Exist!`
        };
    }
};

module.exports = router

    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .post('/:id/stops', (req, res, next) => {
        const location = { city: req.body.city, state: req.body.state, zip: req.body.zip };
        const weather = { temperature: req.body.temperature, condition: req.body.condition };
        Tour.findByIdAndUpdate(req.body.id, {
            $push: { stops: { location, weather } } }, updateOptions)
            .then(tour => {
                res.json(tour);
            })
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

    .get('/', (req, res, next) => {
        Tour.find()
            .lean()
            .then(tours => res.json(tours))
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
const router = require('express').Router();
const Circus = require('../models/Circus');
const findZip = require('../util/find-zip');
const weatherApi = require('../services/weather-api');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router

    .post('/', (req, res, next) => {
        Circus.create(req.body)
            .then(circus => res.json(circus))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Circus.findById(id)
            .lean()
            .then(circus => {
                if(!circus) {
                    next({
                        status: 404,
                        error: `circus id ${id} does not exist`
                    });
                }
                else res.json(circus);
            })
            .catch(next);
    })
    
    .get('/', (req, res, next) => {
        Circus.find(req.query)
            .lean()
            .select('name crew role')
            .then(circus => res.json(circus))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Circus.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(circus => res.json(circus))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Circus.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    })

    .post('/:id/stops', findZip(weatherApi), (req, res, next) => {
        Circus.findByIdAndUpdate(req.params.id, {
            $push: { stops: req.body }
        }, updateOptions)
            .then(circus => {
                res.json(circus.stops[circus.stops.length - 1]);
            })
            .catch(next);
    })

    .put('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;
        const { attendance } = req.body;
        
        Circus.findOneAndUpdate({
            _id: id, 'stops._id': stopId
        }, {
            $set: {
                'stops.$.attendance': attendance
            }
        }, updateOptions)
            .then(circus => {
                res.json(circus.stops.find(stop => stop._id == stopId));
            })
            .catch(next);
    })
        
    .delete('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;
        
        Circus.findByIdAndUpdate(id, {
            $pull: {
                stops: { _id: stopId }
            }
        }, updateOptions)
            .then(updated => res.json({ updated }))
            .catch(next);
    });

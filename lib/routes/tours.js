const router = require('express').Router();
const Tour = require('../models/tourSchema');

const check404 = (tour, id) => {
    if(!tour){
        throw {
            status: 404,
            error: `Tour with ${id} does not exist`
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
        Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).then(tour => res.json(tour))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Tour.find(req.query)
            .lean()
            .then(tours => res.json(tours))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);    
    })

    .post('/:id/stops', (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, {
            $push: { stops: req.body }
        }, {
            new: true,
            runValidators: true
        }).then(tour => {
            res.json(tour.stops[tour.stops.length - 1]);
        })
            .catch(next);
    })

    .put('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;
        const { attendance } = req.body;

        Tour.findOneAndUpdate({
            '_id': id, 'stops._id': stopId
        }, {
            $set: { 'stops.$.attendance': attendance }
        }, {
            new: true,
            runValidators: true
        })
            .then(tour => {
                check404(tour, id);
                res.json(tour.stops.find(s => s._id == stopId));
            })
            .catch(next);
    })

    .delete('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;

        Tour.findByIdAndUpdate(id, {
            $pull: {
                stops: { _id: stopId }
            }
        }, {
            new: true,
            runValidators: true
        })
            .then(tour => {
                check404(tour, id);
                res.json();
            })
            .catch(next);
    });
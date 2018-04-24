const router = require('express').Router();
const Tour = require('../models/tour');

const updateOpts = {
    new: true,
    runValidators: true
};

const check404 = (circus, id) => {
    if(!circus) {
        throw {
            status: 404,
            error: `There is no tour info for ${id}`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(circus => res.json(circus))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Tour.findById(id)
            .lean()
            .then(circus => {
                check404(circus, id);
                res.json(circus);
            })
            .catch(next);
    })    
    .get('/', (req, res, next) => {
        Tour.find(req.body)
            .lean()
            .select('id, title')
            .then(circus => res.json(circus))
            .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(circus => res.json(circus))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    });
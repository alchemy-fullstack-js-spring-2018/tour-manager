const router = require('express').Router();
const Circus = require('../models/Circus');
// const { updateOptions } = require('../util/mongoose-helpers');

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
    });

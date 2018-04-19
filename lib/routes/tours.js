const router = require('express').Router();
const Tour = require('../models/Tour');
const errorHandler = require('../utils/error-handler');

module.exports = router
    .post('/', (req, res) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(err => errorHandler(err, req, res));
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tour.findById(id)
            .lean()
            .then(tour => {
                if(!tour) {
                    errorHandler({
                        status: 404,
                        error: `Tour with id ${id} does not exist`
                    }, req, res);
                }
                else res.json(tour)
            })
            .catch(err => errorHandler(err, req, res));
    });
    
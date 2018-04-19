const router = require('express').Router();
const Tour = require('../models/Tour');
const { updateOptions } = require('../util/mongoose-helpers');

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
    });
const router = require('express').Router();
const Tour = require('../models/Tour');
const errorHandler = require('../utils/error-handler');

module.exports = router
    .post('/', (req, res) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(err => errorHandler(err, req, res));
    })
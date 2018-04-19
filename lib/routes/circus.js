const router = require('express').Router();
const Circus = require('../models/Circus');
// const { updateOptions } = require('../util/mongoose-helpers');

module.exports = router

    .post('/', (req, res, next) => {
        Circus.create(req.body)
            .then(circus => res.json(circus))
            .catch(next);
    });
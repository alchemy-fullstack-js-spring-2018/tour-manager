const router = require('express').Router();
const Tour = require('./models/tour');

const updateOpts = {
    new: true,
    runValidators: true
};

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(circus => res.json(circus))
            .catch(next);
    });
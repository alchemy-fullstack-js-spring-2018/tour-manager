const router = require('express').Router();
const Tour = require('../models/tour');

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
            .then(team => res.json(team))
            .catch(next);
    });
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
            runVAlidators: true
        }).then(tour => res.json(tour))
            .catch(next);
    });
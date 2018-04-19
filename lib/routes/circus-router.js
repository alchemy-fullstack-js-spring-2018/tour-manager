const router = require('express').Router();
const Circus = require('../models/circus-schema');
const { updateOptions } = require('../util/mongoose-helper');

const check404 = (tour, id) => {
    if(!tour) {
        throw {
            status: 404,
            error: `Circus tour id ${id} does not exist`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => { //post method used when uploading data
        Circus.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })
    // .put('/:id', (req, res, next) => {
    //     Circus.findByIdAndUpdate(req.params.id, req.body, updateOptions)
    //         .then(tour => res.json(tour))
    //         .catch(next);
    // })
   
    // .get('/:id', (req, res, next) => {
    //     const { id } = req.params;

    //     Circus.findById(id)
    //         .lean()
    //         .then(tour => {
    //             check404(tour, id);
    //             res.json(tour);
    //         })
    //         .catch(next);
    // })

    // .get('/', (req, res, next) => {
    //     Circus.find(req.query)
    //         .lean() //the lean method is a mongoose method to keep javaScript objects from becoming a Mongoose document. 
    //         .select('title launchDate stops') //this getAll method will select the keys passed through this string.
    //         .then(tour => res.json(tour)) //on default an empty select('') gets all keys!
    //         .catch(next);
    // })

    .delete
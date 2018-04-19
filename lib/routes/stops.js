const router = require('express').Router();
const Stop = require('../models/Stop');

// const check404 = (stop, id) => {
//     if(!stop) {
//         throw {
//             status: 404,
//             error: `Tour Stop of id ${id} does not exist`
//         };
//     }
// };

module.exports = router
    .post('/', (req, res, next) => {
        Stop.create(req.body)
            .then(stop => res.json(stop))
            .catch(next);
    })

    .get('/', (req, res, next) =>{
        Stop.find(req.query)
            .lean()
            .then(stops => res.json(stops))
            .catch(next);
    });
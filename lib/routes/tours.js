const router = require('express').Router();
const Tour = require('../models/Tour');
// const errorHandler = require('../utils/error-hander');

// const check404 = (tour, id) => {
//     if(!tour) {
//         throw {
//             status: 404,
//             error: `Tour id ${id} does not exist`
//         };
//     }
// };

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(pirate => res.json(pirate))
            .catch(next);
    })
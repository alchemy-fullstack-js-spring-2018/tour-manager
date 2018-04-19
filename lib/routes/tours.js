const router = require('express').Router();

module.exports = router
    .get('/', (req, res) => {
        console.log('request heard!');
    });
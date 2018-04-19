/*eslint no-console:off*/

const express = require('express');
const app = express();



app.use((req, res) => {
    console.log('initial app use');
    res.send('circus-tour');
});



module.exports = app;

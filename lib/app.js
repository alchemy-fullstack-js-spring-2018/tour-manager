const express = require('express');
const app = express();

app.use(express.json());

app.use('/tours', tours);

module.exports = app;
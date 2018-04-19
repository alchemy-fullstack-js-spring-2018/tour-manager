const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const circus = require('./routes/circus-router');

app.use(express.json());

//telling express to use this route, so in app when we add our methods it will always append
//to the end of the route /circustour.
app.use('/circustour', circus);

app.use(errorHandler());

module.exports = app;
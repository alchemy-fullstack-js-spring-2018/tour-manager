/* eslint no-console:off*/
module.exports = (err, req, res) => {
    console.log(`FAILED: ${req.method} ${req.url}`);
    console.log(err);
    res.status(err.status || 500).send(err);
};

/*app.use(function(err, req, res, next) { //remember four parameters.
   console.error(err.stack)
   res.status(500).send('Something broke!') //error handler function for routes! 
}) */
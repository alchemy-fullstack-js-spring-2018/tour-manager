/* eslint no-console:off*/
module.exports = (err, req, res) => {
    console.log(`FAILED: ${req.method} ${req.url}`);
    console.log(err);
    res.status(err.status || 404).send(err);
};
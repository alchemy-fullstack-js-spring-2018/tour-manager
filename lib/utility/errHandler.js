module.exports = (err, req, res) => {
    console.log(`BIG FAIL! ${req.method} ${req.url}`);
    console.log(err);
    res.status(err.status || 500).send(err);
};
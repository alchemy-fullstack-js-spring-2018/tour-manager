/* eslint no-console: off */
module.exports = (log = console.log) => {

    return (err, req, res) => {
        let code = 500;
        let error = 'Internal Server Error';

        if(err.status) {
            code = err.status;
            error = err.error;
        }
        else if(err.name === 'CastError') {
            code = 400;
            error = err.message;
        }
        else if(err.name === 'ValidationError') {
            code = 400;
            error = Object.values(err.errors).map(e => e.message);
        }
        else {
            log(err);
        }

        res.send(code).json({ error });
    };
};
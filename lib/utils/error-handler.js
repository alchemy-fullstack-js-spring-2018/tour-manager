module.exports = function createErrorHandler() {
    return (err, req, res, next) => {
        let code = 500;
        let error = { error: 'Internal Server Error' };

        if(err.code) {
            code = err.code;
            error = err.error;
        }

        else if (err.name === 'CastError') {
            code = 400;
            error = { error: err.message };
        }

        else if (err.name === 'ValidationError') {
            code = 400;

            error = {
                error: Object.values(err.errors)
                    .map(value => value.message)
            };
        }

        else {
            console.log(err);
        }

        res.status(code).json(error);
    };
};
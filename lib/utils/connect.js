const mongoose = require('mongoose');

module.exports = function(dbUri) {
    const promise = mongoose.connect(dbUri);

    return promise;
};
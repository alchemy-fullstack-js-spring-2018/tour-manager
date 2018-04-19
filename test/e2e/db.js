const mongoose = require('mongoose');
const connect = require('../../lib/util/connect');

before(() => connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tours-test'));
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName != 'NamespaceNotFound') throw err;
            });
    }
};
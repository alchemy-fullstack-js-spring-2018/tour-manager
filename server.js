/*eslint no-console: off */

const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/models/circusTour');


const PORT = process.env.PORT || 3000;

//env name used by heroku when adding an mLab to instance
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pirates';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('server running', server.address().port);

});

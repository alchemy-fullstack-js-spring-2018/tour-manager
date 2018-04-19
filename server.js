const http = require('http');
/* eslint no-console: off */
const app = require('./lib/app');
const connect =require('./lib/connect.js');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/videogames';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('server is running on', server.address().port);
});
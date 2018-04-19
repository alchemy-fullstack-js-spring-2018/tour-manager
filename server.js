const http = require('http');
const express = require('express');
const app = express();
const connect = require('./lib/connect');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/circus';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('I\'m givin\' her all she\'s got, Captain!!!', server.address().PORT);
});
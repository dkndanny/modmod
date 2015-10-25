'use strict';

require('babel/register')({});

const server = require('./src/server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
    console.log('Server listening on', PORT);
});

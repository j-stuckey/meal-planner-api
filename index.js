'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('./modules/Logger');

const { PORT, CLIENT_ORIGIN } = require('./config');

const app = express();

// parses request body
app.use(express.json());
app.use(logger);

app.get('/', (req, res, next) => {
    res.send('OK');
});

console.log(process.env.NODE_ENV);
    
function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    // dbConnect();
    runServer();
}

module.exports = { app };

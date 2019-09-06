'use strict';

const mongoose = require('mongoose');
const logger = require('../modules/Logger');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const { MONGODB_URI } = require('../config');

function dbConnect(url = MONGODB_URI) {
    return mongoose.connect(url, { useNewUrlParser: true })
    .catch(err => {
        logger.error('Mongoose failed to connect');
        logger.error(err);
    });
}

function dbDisconnect() {
    return mongoose.disconnect();
}

function dbGet() {
    return mongoose;
}

module.exports = {
    dbConnect,
    dbDisconnect,
    dbGet,
};

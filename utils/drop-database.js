'use strict';

const mongoose = require('mongoose');
const logger = require('../modules/Logger');

const { MONGODB_URI } = require('../config');

logger.info(`Connecting to mongodb at ${MONGODB_URI}`);
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        logger.info('Dropping database');
        return mongoose.connection.db.dropDatabase();
    })
    .then(() => {
        logger.info('Disconnecting');
        return mongoose.disconnect();
    })
    .catch(err => {
        logger.error(err);
        return mongoose.disconnect();
    });

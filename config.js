'use strict';
require('dotenv').config();

const { FIFTEEN_MINUTES } = require('./constants/constants');

module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    MONGODB_URI:
        process.env.MONGODB_URI ||
        'mongodb://host.docker.internal:27017/journal',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3d',
    EMAIL_ACCOUNT: process.env.EMAIL_ACCOUNT,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    REQUEST_WINDOW: FIFTEEN_MINUTES
};

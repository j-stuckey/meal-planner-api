'use strict';
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    MONGODB_URI:
        process.env.MONGODB_URI ||
        'mongodb://host.docker.internal:27017/journal',
    JWT_SECRET: process.env.JWT_SECRET
};

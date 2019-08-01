'use strict';

module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/journal'
};

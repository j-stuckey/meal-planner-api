'use strict';

const { Strategy: LocalStrategy } = require('passport-local');
const logger = require('modules/Logger');

const User = require('../models/user');

const localStrategy = new LocalStrategy((username, password, done) => {
    let user;
    //equal to username: username
    User.findOne({ username })
        .then(results => {
            user = results;
            if (!user) {
                logger.error(`User "${username}" does not exist`);
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username',
                    location: 'username'
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                logger.error('Incorrect password');

                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect password',
                    location: 'password'
                });
            }
            return done(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return done(null, false);
            }
            return done(err);
        });
});

module.exports = localStrategy;

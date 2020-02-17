'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require('modules/Logger');
const sendEmail = require('modules/sendEmail');
const User = require('models/user');

const {
    HASH_SOURCE,
    VERIFICATION_EMAIL,
    THANK_YOU_EMAIL_SUBJECT,
    THANK_YOU_EMAIL_TEXT,
} = require('constants/constants');

const router = express.Router();

const validateUserEmail = (req, res, next) => {
    const { email, username } = req.body;

    User.find({ email })
        .then(user => {
            if (user.length) {
                const err = {
                    message: `Email ${email} is taken.`,
                    status: 400,
                };
                // res.status(400).json({ err });
                next(err);
            } else {
                return User.find({ username });
            }

            // return User.find({ username });
        })
        .then(user => {
            if (user.length) {
                const err = {
                    message: `Username ${username} is taken.`,
                    status: 400,
                };

                next(err);
            } else {
                next();
            }
        }).catch(err => {
            logger.debug(err);
        });
};

router.post('/', validateUserEmail, (req, res, next) => {
    let { username, password, email } = req.body;

    return User.hashPassword(password)
        .then(async digest => {
            const newUser = {
                email,
                username: username.toLowerCase(),
                password: digest,
            };
            logger.info(`Creating new user...`);
            return User.create(newUser);
        })
        .then(result => {
            return res
                .status(201)
                .location(`/api/users/${result.id}`)
                .json(result);
        })
        .catch(err => {
            console.log(err);
            // if (err.code === 11000) {
            //     err = new Error(`Username '${req.body.username}' is taken`);
            //     err.status = 400;
            // }
            next(err);
        });
});

module.exports = router;

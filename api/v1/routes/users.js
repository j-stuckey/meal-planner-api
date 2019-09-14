'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require('../../../modules/Logger');
const sendEmail = require('../../../modules/sendEmail');
const User = require('../../../models/user');

const {
    HASH_SOURCE,
    VERIFICATION_EMAIL,
    THANK_YOU_EMAIL_SUBJECT,
    THANK_YOU_EMAIL_TEXT
} = require('../../../constants/constants');

const router = express.Router();

router.post('/', (req, res, next) => {
    let { username, password, email } = req.body;

    return User.hashPassword(password)
        .then(async digest => {
            const newUser = {
                email,
                username: username.toLowerCase(),
                password: digest,
            };
            // return User.create(newUser);

            // sendEmail(email, "Thanks for signing up!", 'Test');
            return newUser;
        })
        .then(user => {
            logger.debug(VERIFICATION_EMAIL);

            const salt = bcrypt.genSaltSync(10);
            const verificationToken = bcrypt.hashSync(HASH_SOURCE, salt);

            const emailText =
                THANK_YOU_EMAIL_TEXT +
                `http://localhost:8080/account/verify/${verificationToken}`;
            sendEmail(user.email, THANK_YOU_EMAIL_SUBJECT, emailText);
        })
        .then(result => {
            return res
                .status(201)
                .location(`/api/users/${result.id}`)
                .json(result);
        })
        .catch(err => {
            if (err.code === 11000) {
                err = new Error(`Username '${req.body.username}' is taken`);
                err.status = 400;
            }
            next(err);
        });
});

module.exports = router;

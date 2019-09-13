'use strict';

const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = require('../config');

const config = {
    emailAccount: EMAIL_ACCOUNT,
    emailPassword: EMAIL_PASSWORD
};

const send = require('gmail-send')({
    user: config.emailAccount,
    pass: config.emailPassword,
    to: '',
    subject: '',
    text: ''
});

const sendEmail = (userEmail, emailSubject, emailText) => {
    send({
        to: userEmail,
        subject: emailSubject,
        text: emailText
    });
};

const filepath = '../files/test.txt';

sendEmail('jstuckey@rutgers.edu', 'TEST EMAIL', `Here's my resume!`, [filepath]);

module.exports = sendEmail;

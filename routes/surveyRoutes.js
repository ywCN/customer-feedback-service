const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // a middleware
const requireCredits = require('../middlewares/requireCredits'); // a middleware

const Survey = mongoose.model('surveys');

module.exports = app => {
    // The order of middlewares matters because they will be executed one by one.
    // In this case, we need the user is logged in first before checking credits.
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        // now the request is a valid one as it passed all middlewares

        const { title, subject, body, recipients } = req.body;

        // create an instance of Survey
        const survey = new Survey({
            title,
            subject,
            body,
            // sub document schema
            // take all email addresses, split it into an array and then
            // return an object for every email address in there with
            // a key.property of email and the value of the actual email address.

            // before ES6 refactoring
            // recipients: recipients.split(',').map(email => {
            //     return { email: email };
            // })

            // after ES6 refactoring
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now()
        });
    });
};

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // a middleware
const requireCredits = require('../middlewares/requireCredits'); // a middleware
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    // The order of middlewares matters because they will be executed one by one.
    // In this case, we need the user is logged in first before checking credits.
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
            recipients: recipients
                .split(',')
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // send email after creating survey instance
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            // send back updated user model
            res.send(user);
        } catch (err) {
            // 422 unprocessable entity
            res.status(422).send(err);
        }
    });
};

const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // a middleware
const requireCredits = require('../middlewares/requireCredits'); // a middleware
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice'); // : wild card
        // 1. iterate and map 2. remove undefined 3. remove dup 4. return value
        // const events =
        _.chain(req.body)
            .map(event => {
                const match = p.test(new URL(event.url).pathname);
                if (match) {
                    return {
                        email: event.email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId, // _ because of mongoose
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 }, // key interpolation
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec();
            })
            .value();

        // console.log(events);

        res.send({}); // let sendgrid know we have received it
    });

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

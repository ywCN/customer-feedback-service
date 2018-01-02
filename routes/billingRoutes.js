const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    // (req, res) =>{} is the request handler
    app.post('/api/stripe', async (req, res) => {
        // make sure user is logged in
        if (!req.user) {
            return res.status(401).send({ error: 'You must log in!' });
        }
        // https://stripe.com/docs/api#create_charge
        // https://www.npmjs.com/package/stripe#using-promises
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        // save() is async
        const user = await req.user.save();
        // send back user
        res.send(user);
    });
};

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    // request handler
    app.post('/api/stripe', (req, res) => {
        // https://stripe.com/docs/api#create_charge
        // https://www.npmjs.com/package/stripe#using-promises
        stripe.charges.create({
            amount: 500,
            currency: 'usd',
            decription: '$5 for 5 credits',
            source: req.body.id
        });
    });
};

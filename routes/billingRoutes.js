const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    // (req, res) =>{} is the request handler
    app.post('/api/stripe', async (req, res) => {
        // https://stripe.com/docs/api#create_charge
        // https://www.npmjs.com/package/stripe#using-promises
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        console.log(charge);
    });
};

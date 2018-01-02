const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // (req, res) =>{} is the request handler
    // Express can accept any number of middlewares or functions.
    // One of them must return a response.
    // All middlewares will be executed before executing logic on the incoming request.
    app.post('/api/stripe', requireLogin, async (req, res) => {
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

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    // request handler
    app.post('/api/stripe', (req, res) => {
        console.log(req.body);
    });
};

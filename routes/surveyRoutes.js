const requireLogin = require('../middlewares/requireLogin'); // a middleware
const requireCredits = require('../middlewares/requireCredits'); // a middleware

module.exports = app => {
    // The order of middlewares matter because they will be executed one by one
    // In this case, we need to make sure user is logged in first then check credits.
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {});
};

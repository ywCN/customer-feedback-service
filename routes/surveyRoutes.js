const requireLogin = require('../middlewares/requireLogin'); // a middleware

module.exports = app => {
    app.post('/api/surveys', requireLogin, (req, res) => {});
};

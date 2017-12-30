/* eslint arrow-parens: 0 */ // --> OFF
const passport = require('passport'); // this is the NPM module

// make app available in this file by export all stuffs
module.exports = app => {
    // This is a route handler. The arrow function will
    // be called when the Route with '/' is being visited.
    app.get(
        '/auth/google',
        // 'google' is the strategy name
        // The GoogleStrategy has an internal identifier
        // of 'google', so no need to define it somewhere.
        passport.authenticate('google', {
            // tells Google what infomation we want
            scope: ['profile', 'email'],
        })
    );

    // we will have the 'code' when using this handler
    app.get('/auth/google/callback', passport.authenticate('google'));
};
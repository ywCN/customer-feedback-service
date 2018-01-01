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
            scope: ['profile', 'email']
        })
    );

    // After user come back from the OAuth flow,
    // passport middleware takes over and after it finished its job,
    // passport pass the request onto the next handler in this chain.
    // The handler is the arrow function and it takes the request in.
    // It tells the response to inform the browser that it needs to
    // go to this route.
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/'); // back to root after logout
    });

    // req: incoming request
    // res: outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};

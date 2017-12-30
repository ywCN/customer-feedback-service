// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// app declaration
const app = express();

// clientID is a public token that can be shared.
// clientSecret should not be shared.
// let passport use the strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        accessToken => {
            console.log(accessToken);
        }
    )
);

// This is a route handler. The arrow function will 
// be called when the Route with '/' is being visited.
// app.get('/', (req, res) => {
//     res.send({ bye: 'friend' });
// });
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

// we will have the 'code' when using this handler
app.get('/auth/google/callback', passport.authenticate('google'));

// env is environment variable
// || 5000 is for development because in local PORT is undefined
// || here is like if statement
const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells Node to listen to this port number

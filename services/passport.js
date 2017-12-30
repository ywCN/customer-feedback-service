const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// User is the model class
const User = mongoose.model('users');

// clientID is a public token that can be shared.
// clientSecret should not be shared.
// let passport use the strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log('accessToken', accessToken);
            // console.log('refreshToken', refreshToken);
            // console.log('profile', profile);

            // find the first match in user collection that id === profile.id
            // this is an async operation returns Promise
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    // already have a record with given profile.id

                    // done(errorInfo, userRecord)
                    done(null, existingUser);
                } else {
                    // create an instance and save it to db
                    // this is an async operation
                    new User({ googleId: profile.id })
                        .save()
                        .then((user) => done(null, user));
                }
            });
        }
    )
);

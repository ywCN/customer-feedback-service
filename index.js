// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
// since the file does not return anything, we do not need to use a variable
// we need to run User first. this is the correct order of operation
require('./models/User');
require('./models/Survey');
require('./services/passport');

// connect to db
mongoose.connect(keys.mongoURI);

// app declaration
const app = express();

// This middleware will parse the body of a post/put/patch request or anything has a
// request body and the assign it to the req.body property of the incoming request body.
app.use(bodyParser.json());

// The app.use() are wired up with middlewares inside our application.
// These middlewares are functions which can modify requests before
// they reach route handlers.(like middlewares in Redux pre-processing actions)
// Both cookieSession and passport are middlewares.
app.use(
    // The cookieSession extracts cookie data and
    // assigns it to the req.session property.
    // Then Passport will look at the req.session property
    // and pass it to de-serialize user and aother stuffs.
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// these are route handlers
// this is like run some code from other file directly
require('./routes/authRoutes')(app); // authRoutes.js returns a function
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Instruct Express to correct routes to find .js files in production context
// The order of operation matter here:
// When request comes into Express, we will first check to see
// if there is some specific file that matches up with what
// that request is looking for. If there is, Express will answer
// the request with app.use(express.static('client/build'));
// If there is not, Express will continue down and find next
// route handler which is the absolute catch-all in the application.
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file.
    // This is the first route handler.
    app.use(express.static('client/build')); // no / why?

    // Express will serve up the index.html file
    // if it does not recongnize the route.

    // This is the backup route handler; all previous attemps to
    // match up the incoming request with some actual requests has failed.
    //
    // If we have nothing inside './routes/authRoutes' file
    // and nothing inside './routes/billingRoutes' file
    // and there is no file inside '/client/build'
    // that matches up with what this request is looking for,
    // just give back the index.html file.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// env is environment variable set up by heroku
// || 5000 is for development because in local PORT is undefined
// || here is like if statement
const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells Node to listen to this port number

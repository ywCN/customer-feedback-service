// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// since the file does not return anything, we do not need to use a variable
// we need to run User first. this is the correct order of operation
require('./models/User');
require('./services/passport');


// connect to db
mongoose.connect(keys.mongoURI);

// app declaration
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey],
    })
);

// this is like run some code from other file directly
require('./routes/authRoutes')(app); // authRoutes.js returns a function

// env is environment variable
// || 5000 is for development because in local PORT is undefined
// || here is like if statement
const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells Node to listen to this port number

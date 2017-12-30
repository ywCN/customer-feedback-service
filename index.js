// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// since the file does not return anything, we do not need to use a variable
require('./services/passport');
require('./models/User');

// connect to db
mongoose.connect(keys.mongoURI);

// app declaration
const app = express();

require('./routes/authRoutes')(app); // authRoutes.js returns a function

// env is environment variable
// || 5000 is for development because in local PORT is undefined
// || here is like if statement
const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells Node to listen to this port number

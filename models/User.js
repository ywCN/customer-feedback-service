const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
});

// create a new model named users
// if this model already exist, mongoose will not override it
mongoose.model('users', userSchema);

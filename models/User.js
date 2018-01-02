const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

// create a new model named users
// if this model already exist, mongoose will not override it
mongoose.model('users', userSchema);

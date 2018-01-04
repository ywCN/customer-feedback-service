// This is a sub document collection.
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = RecipientSchema;

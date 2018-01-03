const mongoose = require('mongoose');
const { Schema } = moogose;

const RecipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = RecipientSchema;

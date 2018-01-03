const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String]
});

// load this up into the mongoose library
// .model(name of the model class, name of the schema)
mongoose.model('surveys', surveySchema);

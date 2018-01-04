const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // helps create Mailer class
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    // first argument is a destructured object
    // second argument is a html String
    constructor({ subject, recipients }, content) {
        super();
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
    }

    formatAddresses(recipients) {
        // destructuring must use () when useing arrow function
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
}

module.exports = Mailer;

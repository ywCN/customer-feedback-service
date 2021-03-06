const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // helps create Mailer class
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    // first argument is a destructured object
    // second argument is a html String
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content); // can merge into this.addContent()
        this.recipients = this.formatAddresses(recipients); // return a formatted list

        // register this with Mailer
        this.addContent(this.body); // addContent() is inherited from helper.Mail
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        // destructuring must use () when useing arrow function
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // this is how sendgrid works
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;

// HELPER FUNCTION
module.exports = {
    setupMailOptions: function(sender, recipient, subject, data) {
        let mailOptions = {
            from: sender,
            to: recipient,
            subject: subject,
            html: data
        };
        return mailOptions;
    },
}
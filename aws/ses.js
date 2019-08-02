var inspect = require('util').inspect;
var AWS = require('aws-sdk');
const nodeMailer = require('nodemailer');
require('dotenv').config();

AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: process.env.AWS_REGION
  });

module.exports = {
    setupAWS: function() {
      let transporter = nodeMailer.createTransport({
        SES: new AWS.SES({
          apiVersion: '2010-12-01'
        })
      });
      return transporter;
    }
};
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'herisetiadi122@gmail.com',
    pass: 'bbrswhjxhftxdzwf',
  },

  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;

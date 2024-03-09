let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD
  }
})

function sendRegistrationEmail(registeredEmail) {
    const mailOptions = {
        from: 'developer@miletap.com',
        to: 'usmanhu21@gmail.com',
        subject: 'Account Registration',
        text: `An Account with email: ${registeredEmail} was registered`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
}

module.exports = {
    sendRegistrationEmail
}
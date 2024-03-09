let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "573e28d310344b",
    pass: "1ebe5777bcce79"
  }
})

const mailOptions = {
  from: 'youremail@gmail.com',
  to: 'usmanhu21@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

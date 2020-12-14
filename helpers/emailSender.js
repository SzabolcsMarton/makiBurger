const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const mailer = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD,
  },
});

exports.sendEmail = async (req, res) => {
  const { name, email, emailValidationCode } = req.body;
  const options = {
    from: process.env.SENDGRID_EMAIL,
    to: email,
    subject: "Sending Email for Confirmation",
    html: `<div style="text-align: center;">
              <h1>Hello ${name}</h1>
              <h2>Welcome by Makiburger</h2>
              </br>
              <p>Please click on the link below to confirm your email address</p>
              <a href="http://localhost:3000/register/registrationConfirmation?code=${emailValidationCode}">
              Click here to confirm email</a>
              </br>
              <p>Or copy this link to your browser:</p>
              <p>http://localhost:3000/register/registrationConfirmation?code=${emailValidationCode}</p>
          </div>
         `,
  };

  try {
    await mailer.sendMail(options);
    res.status(200).json({
      message: "email has been send!  success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

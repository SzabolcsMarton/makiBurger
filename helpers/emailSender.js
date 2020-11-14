const nodemailer = require("nodemailer");

const emailSenderUser = {
  user: "szaszagbr@gmail.com",
  pass: "Szaba1980",
};

exports.mailSender = (sendTo, sendText) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: emailSenderUser,
  });

  const mailOptions = {
    from: emailSenderUser.user,
    to: sendTo,
    subject: "Sending Email for confirmation of email address",
    text: sendText,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

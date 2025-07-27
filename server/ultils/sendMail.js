const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const sendMail = asyncHandler(async ({ email, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Cua hang dien tu" <no-reply@cuahangdientu.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    html: html,
  });
  return info;
});
module.exports = sendMail;

const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const viewPath = path.join(".", "views");

const hbsOptions = {
  viewEngine: {
    extname: ".handlebars",
    partialsDir: viewPath,
    defaultLayout: false,
  },
  viewPath: viewPath,
  extname: ".handlebars",
};

transporter.use("compile", hbs(hbsOptions));

const sendMail = (email, name, token) => {
  const mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: email,
    subject: "Reset your password",
    template: "index",
    context: { userName: name, passwordToken: token },
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;

/*
  html: `
      <p>Hi ${userName},</p>
      <h3>We got a request to reset your password.</h3>
      <p>
        Click this <a href="http://localhost:3000/password/new/${passwordToken}">link</a> to set a new password.
      </p>
      <p>
        If you ignore this message, your password will not be changed.
        This link will expire after 1 hour.
      </p>
    `,
*/

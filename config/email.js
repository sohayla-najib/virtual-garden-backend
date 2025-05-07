// config/email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,  // sandbox.smtp.mailtrap.io
  port: process.env.EMAIL_PORT,  // 2525
  secure: false, // false for port 2525
  auth: {
    user: process.env.EMAIL_USER,  // 99c78513569eea
    pass: process.env.EMAIL_PASS   // c8c6f922d7509c
  },
});

module.exports = transporter;


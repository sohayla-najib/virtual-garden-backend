// utils/emailHelper.js
const transporter = require('../config/email');

const sendVerificationEmail = async (to, token) => {
  const verificationLink = `http://localhost:3000/verify-email?token=${token}`; // Adjust the link to your frontend URL if needed

  const mailOptions = {
    from: '"Virtual Garden" <no-reply@virtualgarden.com>',
    to: to,
    subject: 'Verify Your Email Address',
    html: `
      <h2>Welcome to Virtual Community Garden!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

module.exports = { sendVerificationEmail };

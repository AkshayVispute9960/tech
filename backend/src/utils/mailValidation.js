import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Function to send verification email
const sendVerificationEmail = async (user, req) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const url = `${req.protocol}://${req.get('host')}/api/auth/verify/${token}`;
  
    await transporter.sendMail({
      to: user.email,
      subject: 'Verify your email',
      html: `<h4>Verify your email to complete registration</h4><p>Click <a href="${url}">here</a> to verify your email.</p>`
    });
  };

  export {
    sendVerificationEmail
  }
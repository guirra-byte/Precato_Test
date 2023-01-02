import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a4b3f585716832",
    pass: "4ee6f54e9a6323"
  }
});

export { transport };
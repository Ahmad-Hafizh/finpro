import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmadmaulanahafizh63@gmail.com',
    pass: 'oyrdszaanikdrveh',
  },
});

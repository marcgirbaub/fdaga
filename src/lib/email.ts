import nodemailer from 'nodemailer';

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
}

const transporterOptions = {
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.OUTLOOK_EMAIL_ADDRESS,
    pass: process.env.OUTLOOK_EMAIL_PASSWORD,
  },
};

export const sendEmail = async ({ to, subject, text }: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...transporterOptions,
  });

  return await transporter.sendMail({
    from: process.env.OUTLOOK_EMAIL_ADDRESS,
    to,
    subject,
    text,
  });
};

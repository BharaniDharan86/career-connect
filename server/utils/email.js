import nodemailer from "nodemailer";

export async function sendEmail(mailDetails) {
  // mailoption should contain thes to address, subject of the mail and the actual data in text or in html format

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL_SERVICE_USERNAME,
      pass: process.env.EMAIL_SERVICE_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SERVICE_USERNAME,
    ...mailDetails,
  };

  await transporter.sendMail(mailOptions);
}

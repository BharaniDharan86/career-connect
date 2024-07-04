const htmlTemplate = function (userName, otp) {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: white;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            background-color: #0f172a;
          }
          .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #eaeaea;
          }
          .content {
            padding: 20px 0;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: white;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: white;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Career Connect</h1>
          </div>
          <div class="content">
            <p>Dear ${userName},</p>
            <p>Thank you for registering with Career Connect! </p>
            <p>
              To complete your registration, please verify your email address by
              entering the following One-Time Password (OTP) on the verification
              page:
            </p>
            <div class="otp">${otp}</div>
            <p>If you did not request this email, please ignore it.</p>
            <p>
              Thank you for choosing Career Connect. If you have any questions or
              need assistance, feel free to contact our support team.
            </p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p><a href="mailto:bharanidev.08@gmail.com">bharanidev.08@gmail.com</a></p>
            <p>Career Connect</p>
          </div>
        </div>
      </body>
    </html>`;
};

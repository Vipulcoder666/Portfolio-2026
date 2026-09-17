const nodemailer = require('nodemailer');

const sendInquiryEmail = async (contactData) => {
  const recipientEmail = 'shrivastav.vipul252@gmail.com';
  const { name, email, projectType, budgetRange, message } = contactData;

  try {
    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Production SMTP (Gmail / Custom Mailer)
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Development Test Account via Ethereal / Fallback
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const mailOptions = {
      from: `"Portfolio Contact Form" <noreply@vipul-portfolio.dev>`,
      to: recipientEmail,
      subject: `🚨 New Portfolio Inquiry from ${name} [${projectType}]`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #00f2fe; margin-bottom: 20px;">New Portfolio Contact Inquiry</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #00f2fe;">${email}</a></p>
          <p><strong>Project / Offer Type:</strong> ${projectType}</p>
          <p><strong>Estimated Budget:</strong> ${budgetRange}</p>
          <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;" />
          <h3 style="color: #10b981;">Message Details:</h3>
          <p style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; line-height: 1.6;">${message}</p>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 25px;">Sent from Vipul Shrivastav MERN Portfolio Website</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Dispatch Success] Mail sent to ${recipientEmail}. MessageId: ${info.messageId}`);
    if (nodemailer.getTestMessageUrl(info)) {
      console.log(`[Email Preview URL]: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Dispatch Notice] ${error.message}`);
    // Non-blocking fallback
    return { success: false, error: error.message };
  }
};

module.exports = { sendInquiryEmail };

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",     
    port: 587,                 
    secure: false,             
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false  
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: to,                       
    subject: subject,             
    text: text,                  
    html: html, 
  };

  try {
    await transporter.sendMail(mailOptions);  
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw error; 
  }
};

module.exports = sendEmail;

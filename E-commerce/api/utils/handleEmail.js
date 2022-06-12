const nodemailer = require("nodemailer");
  
  const SendEmailPassword = async (datos) => {
    const { email, name, token } = datos;
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
    }
    });
  
  
    const info = await transport.sendMail({
      from: '"Pet Elegant" <cuentas@PetElegant.com>',
      to: email,
      subject: "Pet Elegant - Reestablece tu Password",
      text: "Reestablece tu Password",
      html: `<p>Hola: ${name} has solicitado reestablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un nuevo password: 
      <a href="${process.env.HOST_CLIENT}/olvide-password/${token}">Reestablecer Password</a>      
      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>     
      
      `,
  });
};

module.exports = { SendEmailPassword };

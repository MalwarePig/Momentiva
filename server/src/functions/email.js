// archivo: enviarCorreo.js
const nodemailer = require('nodemailer');


 function EnviarCorreos() {

     console.error('Corrreeoooo');
    // Configura el transporter con los datos de tu cuenta
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'blackgeass.s@gmail.com',
            pass: '#Dev1702861'
        }
    });

    // Define los datos del correo
    const mailOptions = {
        from: 'blackgeass.s@gmail.com',
        to: 'lulu_ka_n@hotmail.com',
        subject: 'Correo desde Node.js',
        text: '¡Hola! Este correo fue enviado usando Node.js y Nodemailer.',
        // html: '<h1>¡Hola!</h1><p>Correo enviado desde <b>Node.js</b></p>'
    };

    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });

}

module.exports = EnviarCorreos()
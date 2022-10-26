const nodemailer = require("nodemailer");
const email = 'utsav.soni.27@gmail.com'
const pass = 'mxfifqucvnnddxgz';

const sendMail = async (str, data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: email,
            pass: pass,
        },
    });

    var Osubject, Otext, Ohtml;
    if(str == 'signup'){
        Osubject = `Thankyou for signing ${data.name}`;
        Ohtml = `
        <h1> Welcome to FoodApp.com </h1>
        Hope you are having a good time!
        Here are your details:
        Name- ${data.name}
        Email- ${data.email}
        `
    }
    else if(str == 'resetPassword'){
        Osubject = `Reset Password`;
        Ohtml = `
        <h1> fooddapp.com </h1>
        Here is your link to reset your password:
        link: ${data.resetPasswordLink}
        `
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Food App" <utsav.soni.27@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        html: Ohtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendMail;
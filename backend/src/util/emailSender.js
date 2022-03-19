var nodemailer = require('nodemailer');

const emailTemplate = {
    activate: {
        subject: "Activate your Friends@HK account",
        content: `<!DOCTYPE html>
    <html>
    <head>
    <style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
    div {
        background-color: #f2edf3;
        padding: 30px 0px;
        border-radius: 5px;
    }
    .container {
        background-color: white;
        border-radius: 5px;
        margin: auto;
        padding: 20px;
        width: 80%;
    }
    h2 {
        text-align: center;
    }
    a {
    	all: unset;
        text-decoration: none;
        display: block;
        text-align: center;
        border: none;
        width: 80%;
        padding: 14px 28px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        margin: 5px;
        background: #b66dff;
        transition: opacity 0.3s ease;
        color: #ffffff;
        font-weight: 600;
        margin: auto;
    }
    a:hover {
        background-color: #a347ff;
    }
    
    </style>
    </head>
    <body>
    
    <div>
    <div class='container'>
    <h2>Activate your account</h2>
    <p>Hi %name%,</p>
    <p>Thank you for your registration in Friends@HK.<br>
    Click the button below to activate your account.</p>
    
    <a class="mail-button" href="%link%">Get Started!</a>
    
    <br>
    <p>Thanks,</p>
    Friends@HK Team<br>
    </div>
    </div>
    
    </body>
    </html>`
    },
    verify: {
        subject: "Verify your Friends@HK account",
        content: `<!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        div {
            background-color: #f2edf3;
            padding: 30px 0px;
            border-radius: 5px;
        }
        .container {
            background-color: white;
            border-radius: 5px;
            margin: auto;
            padding: 20px;
            width: 80%;
        }
        h2 {
            text-align: center;
        }
        .text-primary {
            color: #b66dff;
            font-weight: 500;
            font-size: 1.125rem;
            letter-spacing: 1px;
        }
        
        </style>
        </head>
        <body>
        
        <div>
        <div class='container'>
        <h2>Verify your account</h2>
        <p>Hi user,</p>
        <p>Thank you for using Friends@HK.<br>
        Please enter the following verification code to complete the login process.</p>
        
        Verification code:<br>
        <span class="text-primary">%code%</span>
        
        <p>The code only works for 5 minutes, enter it in the application before it expires.</p>

        <br>
        <p>Best regards,</p>
        Friends@HK Team<br>
        </div>
        </div>
        
        </body>
        </html>`
    },
    forgotPassword: {
        subject: "Reset your Friends@HK password",
        content: `<!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        div {
            background-color: #f2edf3;
            padding: 30px 0px;
            border-radius: 5px;
        }
        .container {
            background-color: white;
            border-radius: 5px;
            margin: auto;
            padding: 20px;
            width: 80%;
        }
        h2 {
            text-align: center;
        }
        .text-primary {
            color: #b66dff;
            font-weight: 500;
            font-size: 1.125rem;
            letter-spacing: 1px;
        }
        
        </style>
        </head>
        <body>
        
        <div>
        <div class='container'>
        <h2>Reset your account password</h2>
        <p>Hi user,</p>
        <p>Thank you for using Friends@HK.<br>
        Please enter the following verification code to reset your password.</p>
        
        Verification code:<br>
        <span class="text-primary">%code%</span>
        
        <p>The code only works for 5 minutes, enter it in the application before it expires.</p>

        <br>
        <p>Best regards,</p>
        Friends@HK Team<br>
        </div>
        </div>
        
        </body>
        </html>`
    }
}

class EmailSender {

    constructor(activationURL, loginVerificationURL) {
        this.auth = {
            user: 'yannisgame.2020@gmail.com',
            pass: 'Yannis0519'
        }

        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: this.auth
        });

        this.activationURL = activationURL;
    }

    sendAccountActivation(receiverEmail, receiverName, activateId, callback) {
        const activationURL = this.activationURL.replace("%email%", encodeURIComponent(receiverEmail)).replace("%id%", activateId);
        const subject = emailTemplate.activate.subject;
        const content = emailTemplate.activate.content.replace("%name%", receiverName).replace("%link%", activationURL);

        var mailOptions = {
            from: this.auth.user,
            to: receiverEmail,
            subject: subject,
            html: content
        };

        this.transporter.sendMail(mailOptions, callback);
    }

    sendLoginVerification(receiverEmail, verificationCode, callback) {
        const subject = emailTemplate.verify.subject;
        const content = emailTemplate.verify.content.replace("%code%", verificationCode);

        var mailOptions = {
            from: this.auth.user,
            to: receiverEmail,
            subject: subject,
            html: content
        };

        this.transporter.sendMail(mailOptions, callback);
    }

    sendForgotPassword(receiverEmail, verificationCode, callback) {
        const subject = emailTemplate.forgotPassword.subject;
        const content = emailTemplate.forgotPassword.content.replace("%code%", verificationCode);

        var mailOptions = {
            from: this.auth.user,
            to: receiverEmail,
            subject: subject,
            html: content
        };

        this.transporter.sendMail(mailOptions, callback);
    }

}

module.exports = EmailSender
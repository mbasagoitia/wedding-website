import nodemailer from 'nodemailer';

const sendEmail = async (mailOptions) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS, // Your Gmail address
            pass: process.env.EMAIL_PASSWORD, // Gmail app password
        },
    });

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.mailgun.org', // Mailgun SMTP host
    //     port: 587, // Port for sending emails
    //     auth: {
    //         user: 'your-mailgun-smtp-user', // Mailgun SMTP username
    //         pass: 'your-mailgun-smtp-password', // Mailgun SMTP password
    //     },
    // });

    transporter.verify((err, success) => {
        if (err) {
            console.error('Email server connection failed:', err);
        } else {
            console.log('Email server connected successfully');
        }
    });

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;
import nodemailer from 'nodemailer';

const sendEmail = async (mailOptions) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS, // Your Gmail address
            pass: process.env.EMAIL_PASSWORD, // Gmail app password
        },
    });

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
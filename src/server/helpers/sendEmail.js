import Mailgun from 'mailgun.js';
import formData from 'form-data';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const templatePath = path.join(__dirname, 'rsvpTemplate.html');
        const data = await fs.readFile(templatePath, 'utf8');

        const rsvpHtmlContent = data
            .replace('{{guestName}}', details.name)
            .replace('{{guests}}', details.guests)
            .replace('{{email}}', details.email)
            .replace('{{phone}}', details.phone)
            .replace('{{comments}}', details.comments || 'No comments');

        const mailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            to: [details.email],
            subject: 'RSVP Confirmation',
            html: rsvpHtmlContent,
        };

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const response = await mg.messages.create("mg.basagoitia.net", mailOptions);
        console.log('Email sent successfully:', response);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

export default sendEmail;

import Mailgun from 'mailgun.js';
import formData from 'form-data';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sendGuestRsvpEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const templatePath = path.join(__dirname, 'rsvpTemplate.html');

        const HTMLData = await fs.readFile(templatePath, 'utf8');

        const guestNamesString = details.attendance && details.guestNames.length > 0 ? details.guestNames.join(", ") : "N/A";

        const htmlContent = HTMLData
            .replace('{{guestName}}', details.name)
            .replace('{{guests}}', details.guests)
            .replace('{{guestNamesString}}', guestNamesString)
            .replace('{{email}}', details.email)
            .replace('{{phone}}', details.phone)
            .replace('{{comments}}', details.comments || 'No comments');
    
        const mailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            to: [details.email],
            subject: 'RSVP Confirmation',
            html: htmlContent
        };

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const response = await mg.messages.create("mg.basagoitia.net", mailOptions);
        console.log('Emails sent successfully:', response);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

const sendAdminRsvpEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);

        const templatePath = path.join(__dirname, 'adminRsvpTemplate.html');

        const HTMLData = await fs.readFile(templatePath, 'utf8');

        const guestNamesString = details.attendance && details.guestNames.length > 0 ? details.guestNames.join(", ") : "N/A";

        const htmlContent = HTMLData
            .replace('{{guestName}}', details.name)
            .replace('{{attendance}}', details.attendance ? "Yes": "No")
            .replace('{{guests}}', details.guests)
            .replace('{{guestNamesString}}', guestNamesString)
            .replace('{{email}}', details.email)
            .replace('{{phone}}', details.phone)
            .replace('{{message}}', details.message)
            .replace('{{comments}}', details.comments || 'No comments');

        
        const mailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            to: ["marika.basagoitia@gmail.com"],
            // to: ["alex.basagoitia@gmail.com", "TarynChovan@outlook.com"],
            subject: 'New Wedding RSVP',
            html: htmlContent
        }

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const response = await mg.messages.create("mg.basagoitia.net", mailOptions);
        console.log('Emails sent successfully:', response);

    } catch (err) {
        console.error("Error sending email:", err);
    }
};

const sendGuestContributionEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const templatePath = path.join(__dirname, 'guestContributionTemplate.html');

        const HTMLData = await fs.readFile(templatePath, 'utf8');

        const htmlContent = HTMLData
            .replace('{{name}}', details.name)
    
        const mailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            to: [details.email],
            subject: 'Thank You For Your Contribution!',
            html: htmlContent
        };

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const response = await mg.messages.create("mg.basagoitia.net", mailOptions);
        console.log('Emails sent successfully:', response);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

const sendAdminContributionEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const templatePath = path.join(__dirname, 'adminContributionTemplate.html');

        const HTMLData = await fs.readFile(templatePath, 'utf8');

        const htmlContent = HTMLData
            .replace('{{name}}', details.name)
            .replace('{{email}}', details.email)
            .replace('{{amount}}', details.amount)
    
        const mailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            // to: ["alex.basagoitia@gmail.com", "TarynChovan@outlook.com"],
            to: ["marika.basagoitia@gmail.com"],
            subject: 'New Wedding Contribution!',
            html: htmlContent
        };

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const response = await mg.messages.create("mg.basagoitia.net", mailOptions);
        console.log('Emails sent successfully:', response);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

const sendAdminMessageEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const templatePath = path.join(__dirname, 'adminMessageEmail.html');

        const HTMLData = await fs.readFile(templatePath, 'utf8');

        const htmlContent = HTMLData
            .replace('{{name}}', details.name)
            .replace('{{message}}', details.message)
    
        const mailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            // to: ["alex.basagoitia@gmail.com", "TarynChovan@outlook.com"],
            to: ["marika.basagoitia@gmail.com"],
            subject: 'New Wedding Contribution!',
            html: htmlContent
        };

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const response = await mg.messages.create("mg.basagoitia.net", mailOptions);
        console.log('Emails sent successfully:', response);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

export {
    sendGuestRsvpEmail,
    sendAdminRsvpEmail,
    sendGuestContributionEmail,
    sendAdminContributionEmail,
    sendAdminMessageEmail
};

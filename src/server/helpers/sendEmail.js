import Mailgun from 'mailgun.js';
import formData from 'form-data';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
// this should be separated into two different files because we always want admin confirmations, but not always guest confirmations

const sendEmail = async (details) => {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const guestTemplatePath = path.join(__dirname, 'rsvpTemplate.html');
        const adminTemplatePath = path.join(__dirname, 'adminRsvpTemplate.html');

        const guestHTMLData = await fs.readFile(guestTemplatePath, 'utf8');
        const adminHTMLData = await fs.readFile(adminTemplatePath, 'utf8');

        const guestNamesString = details.attendance && details.guestNames.length > 0 ? details.guestNames.join(", ") : "N/A";

        const rsvpHtmlContent = guestHTMLData
            .replace('{{guestName}}', details.name)
            .replace('{{guests}}', details.guests)
            .replace('{{guestNamesString}}', guestNamesString)
            .replace('{{email}}', details.email)
            .replace('{{phone}}', details.phone)
            .replace('{{comments}}', details.comments || 'No comments');
        
        const adminRsvpHtmlContent = adminHTMLData
            .replace('{{guestName}}', details.name)
            .replace('{{attendance}}', details.attendance ? "Yes": "No")
            .replace('{{guests}}', details.guests)
            .replace('{{guestNamesString}}', guestNamesString)
            .replace('{{email}}', details.email)
            .replace('{{phone}}', details.phone)
            .replace('{{message}}', details.message)
            .replace('{{comments}}', details.comments || 'No comments');

        const guestMailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            to: [details.email],
            subject: 'RSVP Confirmation',
            html: rsvpHtmlContent
        };
        
        const adminMailOptions = {
            from: 'Alex and Taryn <postmaster@mg.basagoitia.net>',
            // to: ["marika.basagoitia@gmail.com"],
            to: ["alex.basagoitia@gmail.com", "TarynChovan@outlook.com"],
            subject: 'New Wedding RSVP',
            html: adminRsvpHtmlContent
        }

        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

        const guestResponse = await mg.messages.create("mg.basagoitia.net", guestMailOptions);
        const adminResponse = await mg.messages.create("mg.basagoitia.net", adminMailOptions);
        console.log('Emails sent successfully:', guestResponse, adminResponse);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

export default sendEmail;

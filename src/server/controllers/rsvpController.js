import mysql from "mysql2";

import submitRsvp from "../helpers/submitRsvp.js";
import sendEmail from "../helpers/sendEmail.js";
import rsvpHtmlContent from "../helpers/rsvpEmail.js";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
const db = mysql.createConnection(dbConfig);

const submitRsvpForm = async (req, res) => {
    const { name, attendance, guests, comments } = req.body;
    try {
        submitRsvp(req, db)
        // Only send email confirmation if they are attending
        const mailOptions = {
            from: '"Alex and Taryn" <your-email@gmail.com>',
            to: email,
            subject: 'Wedding RSVP Confirmation',
            html: rsvpHtmlContent,
        };

        sendEmail(mailOptions);
        res.status(200).send('RSVP and guest details submitted successfully');
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default submitRsvpForm;
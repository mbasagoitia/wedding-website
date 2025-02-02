import mysql from "mysql2";

import submitRsvp from "../helpers/submitRsvp.js";
import sendEmail from "../helpers/sendEmail.js";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const db = mysql.createConnection(dbConfig);

const submitRsvpForm = async (req, res) => {
    // Sanitize the html here not in the helper functions
    const { name, email, attendance, guests, guestNames, phone, comments, message } = req.body;
    const details = {
        name,
        email,
        phone,
        guests,
        comments
    }

    try {
        submitRsvp(req, db)

        // Only send email confirmation if they are attending
        if (attendance) {
            sendEmail(details);
            // Also send confirmation to Alex and Taryn... fetch/join guests from table and send?
        }
        res.status(200).send('RSVP and guest details submitted successfully');
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default submitRsvpForm;
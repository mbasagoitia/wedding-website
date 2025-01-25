import mysql from "mysql2";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const submitRsvpForm = async (req, res) => {
    const { name, attendance, guests, guestNames, email, phone, comments, message } = req.body;
    console.log(name, attendance, guests, guestNames, email, phone, comments, message);
    try {
        const db = mysql.createConnection(dbConfig);
        const query = 'INSERT INTO RSVP (name, attendance, guests, guestNames, email, phone, comments, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        // The issue is you're submitting an array of guestNames... do this as separate calls attaching to main person
        db.query(query, [name, attendance, guests, guestNames, email, phone, comments, message], (err, result) => {
            if (err) {
                console.error('Error inserting data into RSVP:', err);
                return res.status(500).send('Database error');
            }
            console.log('RSVP entry inserted:', result);
            res.status(200).send('RSVP submitted successfully');
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default submitRsvpForm;
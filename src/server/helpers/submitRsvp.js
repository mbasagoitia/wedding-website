import mysql from "mysql2";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const db = mysql.createConnection(dbConfig);

const submitRsvp = async (req, res) => {
    try {
        const { name, attendance, guests, guestNames = [], email, phone, comments, message } = req.body;
        const rsvpQuery = 'INSERT INTO RSVP (name, attendance, guests, email, phone, comments, message) VALUES (?, ?, ?, ?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.query(rsvpQuery, [name, attendance, guests, email, phone, comments, message], (err, result) => {
                if (err) {
                    console.error('Error inserting data into RSVP:', err);
                    reject(new Error('Database error while inserting RSVP.'));
                    return;
                }

                const rsvpId = result.insertId;

                if (Array.isArray(guestNames) && guestNames.length > 0) {
                    const guestQuery = 'INSERT INTO Guests (rsvp_id, guest_name, is_child) VALUES ?';
                    const guestData = guestNames.map((guest) => [rsvpId, guest.name, guest.isChild]);

                    db.query(guestQuery, [guestData], (err, guestResult) => {
                        if (err) {
                            console.error('Error inserting guests into Guests table:', err);
                            reject(new Error('Database error while inserting guests.'));
                            return;
                        }
                        console.log('Guests inserted successfully:', guestResult);
                    });
                }

                resolve({ success: true, message: 'RSVP submitted successfully!' });
            });
        });

    } catch (error) {
        console.error("Unexpected error in submitRsvp:", error);
        return { success: false, message: "Internal server error while submitting RSVP." };
    }
};

export default submitRsvp;

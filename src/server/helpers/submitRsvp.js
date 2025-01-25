// Submit RSVP to database
const submitRsvp = async (req, db) => {
    const { name, attendance, guests, guestNames, email, phone, comments, message } = req.body;
    const rsvpQuery = 'INSERT INTO RSVP (name, attendance, guests, email, phone, comments, message) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(rsvpQuery, [name, attendance, guests, email, phone, comments, message], (err, result) => {
        if (err) {
            console.error('Error inserting data into RSVP:', err);
            return res.status(500).send('Database error');
        }
    
        const rsvpId = result.insertId;

        const guestQuery = 'INSERT INTO Guests (rsvp_id, guest_name) VALUES ?';
        const guestData = guestNames.map((guest) => [rsvpId, guest]);

        db.query(guestQuery, [guestData], (err, guestResult) => {
            if (err) {
                console.error('Error inserting guests into Guests table:', err);
                return res.status(500).send('Database error while inserting guests');
            }
    
            console.log('Guests inserted successfully:', guestResult);
        })
    })
};

export default submitRsvp;
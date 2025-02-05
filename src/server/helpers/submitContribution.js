import mysql from "mysql2";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const db = mysql.createConnection(dbConfig);

const submitContribution = async (req, res) => {
    try {
        const { name, email, amount } = req.body;

        if (!name || !email || !amount) {
            return res.status(400).json({ success: false, message: "Name, email, and amount are required." });
        }

        const contributionQuery = 'INSERT INTO guest_contributions (name, email, amount) VALUES (?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.query(contributionQuery, [name, email, amount], (err, result) => {
                if (err) {
                    console.error('Error inserting data into guest_contributions:', err);
                    reject(new Error('Database error while inserting contribution.'));
                    return;
                }

                resolve({ success: true, message: 'Contribution submitted successfully!' });
            });
        });

    } catch (error) {
        console.error("Unexpected error in submitContribution:", error);
        return res.status(500).json({ success: false, message: "Internal server error while submitting contribution." });
    }
};

export default submitContribution;

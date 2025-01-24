import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const pool = mysql.createPool(dbConfig);


const createAuthenticatedUser = async (userInfo) => {
    const { name, email } = userInfo;

    const selectQuery = 'SELECT * FROM AuthenticatedUsers WHERE email = ?';
    const insertQuery = 'INSERT INTO AuthenticatedUsers (name, email) VALUES (?, ?)';

    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(selectQuery, [email]);
        if (rows.length > 0) {
            console.log('User already exists in the database.');
            connection.release();
            return rows[0];
        }

        const [result] = await connection.execute(insertQuery, [name, email]);
        console.log('User created successfully:', result);

        connection.release();
        return { id: result.insertId, name, email };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export default createAuthenticatedUser;

const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true
});
db.getConnection()
    .then(conn => {
        console.log('Connected to MySQL DB');
        conn.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL DB:', err);
    });

module.exports = db;

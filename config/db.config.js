// const mysql = require('mysql2/promise');
require('dotenv').config();
const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
    db.authenticate()
      .then(() => {
        console.log('Connected to MySQL DB');
      })
      .catch(err => {
        console.error('Error connecting to MySQL DB:', err);
      });



// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true
// });
// db.getConnection()
//     .then(conn => {
//         console.log('Connected to MySQL DB');
//         conn.release();
//     })
//     .catch(err => {
//         console.error('Error connecting to MySQL DB:', err);
//     });

module.exports = db;

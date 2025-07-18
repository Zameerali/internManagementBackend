const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); 
const Intern = sequelize.define('Intern', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  joined_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'interns',
  timestamps: false 
});

module.exports = Intern;

















// const { get } = require('mongoose');
// const db = require('../config/db.config.js');

// module.exports = {
//     getAllInterns: async () => {
//         const [rows] = await db.query('SELECT * FROM interns');
//         return rows;
//     },
//     getInternById: async (id) => {
//         const [rows] = await db.query('SELECT * FROM interns WHERE id = ?', [id]);
//         return rows[0];
//     },
//     createIntern: async ({name,email,joined_date}) => {
//         const [result] = await db.query('INSERT INTO interns (name, email, joined_date) VALUES (?, ?, ?)', [name, email, joined_date]);
//         return { id: result.insertId, name, email, joined_date };
//     }
// }
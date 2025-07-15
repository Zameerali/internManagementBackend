const { get } = require('mongoose');
const db = require('../config/db.config.js');

module.exports = {
    getAllInterns: async () => {
        const [rows] = await db.query('SELECT * FROM interns');
        return rows;
    },
    getInternById: async (id) => {
        const [rows] = await db.query('SELECT * FROM interns WHERE id = ?', [id]);
        return rows[0];
    },
    createIntern: async ({name,email,joined_date}) => {
        const [result] = await db.query('INSERT INTO interns (name, email, joined_date) VALUES (?, ?, ?)', [name, email, joined_date]);
        return { id: result.insertId, name, email, joined_date };
    }
}
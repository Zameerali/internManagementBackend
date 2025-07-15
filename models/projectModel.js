const db = require('../config/db.config.js');

module.exports = {
  getAllProjects: async () => {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
  },

  createProject: async (name) => {
    const [result] = await db.query('INSERT INTO projects (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  },
};

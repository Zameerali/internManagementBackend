const db = require('../config/db.config.js');

module.exports = {
  getProfileByInternId: async (intern_id) => {
    const [rows] = await db.query('SELECT * FROM profiles WHERE intern_id = ?', [intern_id]);
    return rows;
  },
};

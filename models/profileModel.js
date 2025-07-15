
const db = require('../config/db.config.js');

module.exports = {
  getProfileByInternId: async (intern_id) => {
    const [rows] = await db.query('SELECT * FROM profiles WHERE intern_id = ?', [intern_id]);
    return rows;
  },
    createProfile: async (intern_id, { bio, linkedin }) => {
    const [result] = await db.query(
      'INSERT INTO profiles (intern_id, bio, linkedin) VALUES (?, ?, ?)',
      [intern_id, bio, linkedin]
    );
    return { intern_id, bio, linkedin };
  },
};

const db = require('../config/db.config.js');


module.exports = {
  assignProjectToInterns: async (intern_ids, project_id) => {
    const values = intern_ids.map((intern_id) => [intern_id, project_id]);
    return db.query(
      'INSERT INTO intern_projects (intern_id, project_id) VALUES ?',
      [values]
    );
  },

  getProjectsByIntern: (intern_id) =>
    db.query(`
      SELECT p.*
      FROM projects p
      JOIN intern_projects ip ON p.id = ip.project_id
      WHERE ip.intern_id = ?
    `, [intern_id])
};

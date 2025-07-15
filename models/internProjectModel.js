

const db = require('../config/db.config.js');


module.exports = {
  assignProjectToInterns: async (intern_ids, project_id) => {
    if (!intern_ids.length) return;
    const values = intern_ids.map((intern_id) => [intern_id, project_id]);
    await db.query(
      'INSERT INTO intern_projects (intern_id, project_id) VALUES ?',
      [values]
    );
    await Promise.all(
      intern_ids.map((intern_id) =>
        db.query(
          'INSERT INTO project_history (project_id, intern_id, action) VALUES (?, ?, ?)',
          [project_id, intern_id, 'assigned']
        )
      )
    );
  },

  getProjectsByIntern: (intern_id) =>
    db.query(`
      SELECT p.*
      FROM projects p
      JOIN intern_projects ip ON p.id = ip.project_id
      WHERE ip.intern_id = ?
    `, [intern_id]),
  getInternsByProject: (project_id) =>
    db.query(`
      SELECT i.*
      FROM interns i
      JOIN intern_projects ip ON i.id = ip.intern_id
      WHERE ip.project_id = ?
    `, [project_id]),
  unassignProjectFromInterns: async (intern_ids, project_id) => {
    if (!intern_ids.length) return;
    await db.query(
      'DELETE FROM intern_projects WHERE project_id = ? AND intern_id IN (?)',
      [project_id, intern_ids]
    );
    await Promise.all(
      intern_ids.map((intern_id) =>
        db.query(
          'INSERT INTO project_history (project_id, intern_id, action) VALUES (?, ?, ?)',
          [project_id, intern_id, 'unassigned']
        )
      )
    );
  },
  addProjectHistory: async (project_id, action, status = null) => {
    await db.query(
      'INSERT INTO project_history (project_id, intern_id, action, status) VALUES (?, ?, ?, ?)',
      [project_id, null, action, status]
    );
  },
  getProjectHistory: async (project_id) => {
    const [rows] = await db.query(
      `SELECT * FROM project_history WHERE project_id = ? ORDER BY timestamp DESC`,
      [project_id]
    );
    return rows;
  },
};

const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');

const InternProject = sequelize.define('InternProject', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  intern_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  project_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  tableName: 'intern_projects',
  timestamps: true
});

module.exports = InternProject;




// const db = require('../config/db.config.js');


// module.exports = {
//   assignProjectToInterns: async (intern_ids, project_id) => {
//     if (!intern_ids.length) return;
//     const values = intern_ids.map((intern_id) => [intern_id, project_id]);
//     await db.query(
//       'INSERT INTO intern_projects (intern_id, project_id) VALUES ?',
//       [values]
//     );
//     await Promise.all(
//       intern_ids.map((intern_id) =>
//         db.query(
//           'INSERT INTO project_history (project_id, intern_id, action) VALUES (?, ?, ?)',
//           [project_id, intern_id, 'assigned']
//         )
//       )
//     );
//   },
//     getAllAssignedInterns: async () => {
//     const [rows] = await db.query(
//       `SELECT project_id, intern_id FROM intern_projects`
//     );
//     const map = {};
//     rows.forEach(({ project_id, intern_id }) => {
//       if (!map[project_id]) map[project_id] = [];
//       map[project_id].push(intern_id);
//     });
//     return map;
//   },
//   getProjectsByIntern: (intern_id) =>
//     db.query(`
//       SELECT p.*
//       FROM projects p
//       JOIN intern_projects ip ON p.id = ip.project_id
//       WHERE ip.intern_id = ?
//     `, [intern_id]),
    
//   getInternsByProject: (project_id) =>
//     db.query(`
//       SELECT i.*
//       FROM interns i
//       JOIN intern_projects ip ON i.id = ip.intern_id
//       WHERE ip.project_id = ?
//     `, [project_id]),
//   unassignProjectFromInterns: async (intern_ids, project_id) => {
//     if (!intern_ids.length) return;
//     await db.query(
//       'DELETE FROM intern_projects WHERE project_id = ? AND intern_id IN (?)',
//       [project_id, intern_ids]
//     );
//     await Promise.all(
//       intern_ids.map((intern_id) =>
//         db.query(
//           'INSERT INTO project_history (project_id, intern_id, action) VALUES (?, ?, ?)',
//           [project_id, intern_id, 'unassigned']
//         )
//       )
//     );
//   },
//   addProjectHistory: async (project_id, action, status = null) => {
//     await db.query(
//       'INSERT INTO project_history (project_id, intern_id, action, status) VALUES (?, ?, ?, ?)',
//       [project_id, null, action, status]
//     );
//   },
//   getProjectHistory: async (project_id) => {
//     const [rows] = await db.query(
//       `SELECT * FROM project_history WHERE project_id = ? ORDER BY timestamp DESC`,
//       [project_id]
//     );
//     return rows;
//   },
// };

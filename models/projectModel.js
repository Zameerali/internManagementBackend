const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db.config');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('in_progress', 'completed'),
    defaultValue: 'in_progress'
  }
}, {
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;











// const db = require('../config/db.config.js');

// module.exports = {
//   getAllProjects: async () => {
//     const [rows] = await db.query('SELECT * FROM projects');
//     return rows;
//   },

//   createProject: async (name, status = 'in_progress') => {
//     const [result] = await db.query('INSERT INTO projects (name, status) VALUES (?, ?)', [name, status]);
//     return { id: result.insertId, name, status };
//   },

//   updateProjectStatus: async (projectId, status) => {
//     await db.query('UPDATE projects SET status = ? WHERE id = ?', [status, projectId]);
//     return { id: projectId, status };
//   },
// };

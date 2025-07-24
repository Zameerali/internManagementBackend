const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');
const Task = sequelize.define('Task', {
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
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  task_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'tasks',
  timestamps: true
});

module.exports = Task;






// const db = require('../config/db.config.js');


// module.exports = {
//     addTask: async ({intern_id,project_id,title,description,task_date})=>{
//         const[result] = await db.query('INSERT into tasks (intern_id,project_id, title, description, task_date) VALUES (?, ?, ?, ?, ?)',[intern_id,project_id,title,description,task_date])
//     },
//     getTasksByIntern: async (intern_id) => {
//         const [rows] = await db.query('SELECT * FROM tasks where intern_id = ?',[intern_id])
//         return rows
//     },
//     getTasksByProject: async (project_id) => {
//         const [rows] = await db.query('SELECT * FROM tasks where project_id = ?',[project_id])
//         return rows
//     },
//     updateTaskStatus: async ({id, status})=>{
//         await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
//         return { id, status }; 
//     },
//     getAllTasksWithIntern: async () => {
//         const [rows] = await db.query('SELECT tasks.*, interns.name AS intern_name, interns.email FROM tasks JOIN interns ON tasks.intern_id = interns.id');
//         return rows;
//     }
// }
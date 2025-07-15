const db = require('../config/db.config.js');


module.exports = {
    addTask: async ({intern_id,title,description,task_date})=>{
        const[result] = await db.query('INSERT into tasks (intern_id, title, description, task_date) VALUES (?, ?, ?, ?)',[intern_id,title,description,task_date])
    },
    getTasksByIntern: async (intern_id) => {
        const [rows] = await db.query('SELECT * FROM tasks where intern_id = ?',[intern_id])
        return rows
    },
    updateTaskStatus: async ({id, status})=>{
        await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
        return { id, status }; 
    },
    getAllTasksWithIntern: async () => {
        const [rows] = await db.query('SELECT tasks.*, interns.name AS intern_name, interns.email FROM tasks JOIN interns ON tasks.intern_id = interns.id');
        return rows;
    }
}
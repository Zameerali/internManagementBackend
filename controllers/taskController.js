const { Task, Intern, Project } = require('../models');
const { Op } = require('sequelize'); 

exports.addTask = async (req, res) => {
  try {
    const { intern_id, project_id, title, description, task_date, deadline, status } = req.body;
    console.log('addTask: Payload:', { intern_id, project_id, title, description, task_date, deadline, status });

    if (!intern_id || !project_id || !title || !description || !task_date || !deadline) {
      console.log('addTask: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const intern = await Intern.findByPk(intern_id);
    if (!intern) {
      console.log('addTask: Intern not found:', intern_id);
      return res.status(404).json({ error: 'Intern not found' });
    }

    const project = await Project.findByPk(project_id);
    if (!project) {
      console.log('addTask: Project not found:', project_id);
      return res.status(404).json({ error: 'Project not found' });
    }

    await Task.create({
      intern_id,
      project_id,
      title,
      description,
      task_date,
      deadline,
      status: status || 'pending',
    });
    res.status(201).json({ message: 'Task added' });
  } catch (err) {
    console.error('addTask: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByIntern = async (req, res) => {
  if (req.user.role === 'student' && req.user.id !== Number(req.params.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const intern_id = parseInt(req.params.id, 10);
    console.log('getTasksByIntern: intern_id:', intern_id);

    if (!intern_id || isNaN(intern_id)) {
      console.log('getTasksByIntern: Invalid intern_id');
      return res.status(400).json({ error: 'Intern ID is required' });
    }

    const tasks = await Task.findAll({ where: { intern_id } });
    res.json(tasks.map((t) => t.get({ plain: true })));
  } catch (err) {
    console.error('getTasksByIntern: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log('updateTaskStatus: Payload:', { id, status });

    if (!id || !status) {
      console.log('updateTaskStatus: Missing id or status');
      return res.status(400).json({ error: 'Task ID and status are required' });
    }

    const task = await Task.findByPk(id);
    if (!task) {
      console.log('updateTaskStatus: Task not found:', id);
      return res.status(404).json({ error: 'Task not found' });
    }
    if(req.user.role === 'student' && req.user.id !== task.intern_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await task.update({ status });
    res.json({ message: 'Task status updated' });
  } catch (err) {
    console.error('updateTaskStatus: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTasksWithIntern = async (req, res) => {
  try {
    const {deadlineStatus } = req.query;
    let where = {};
    if (deadlineStatus === 'passed') {
      where.deadline = { [Op.lt]: new Date() };
    }
    else if (deadlineStatus === 'upcoming') {
      where.deadline = { [Op.gte]: new Date() };
    }
    const tasks = await Task.findAll({
      where,
      include: [
        {
          model: Intern,
          attributes: ['name', 'email'],
        },
      ],
    });
    const tasksWithIntern = tasks.map((task) => ({
      ...task.get({ plain: true }),
      intern_name: task.Intern ? task.Intern.name : null,
      email: task.Intern ? task.Intern.email : null,
    }));
    res.json(tasksWithIntern);
  } catch (err) {
    console.error('getAllTasksWithIntern: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const project_id = parseInt(req.params.id, 10);
    console.log('getTasksByProject: project_id:', project_id);

    if (!project_id || isNaN(project_id)) {
      console.log('getTasksByProject: Invalid project_id');
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const tasks = await Task.findAll({ where: { project_id } });
    res.json(tasks.map((t) => t.get({ plain: true })));
  } catch (err) {
    console.error('getTasksByProject: Error:', err);
    res.status(500).json({ error: err.message });
  }
};
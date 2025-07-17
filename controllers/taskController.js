const Task = require('../models/taskModel');

exports.addTask = async (req, res) => {
  try {
    await Task.addTask(req.body);
    res.status(201).json({ message: 'Task added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByIntern = async (req, res) => {
  try {
    const rows = await Task.getTasksByIntern(req.params.id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    console.log('Updating task status:', req.body);
    await Task.updateTaskStatus(req.body);
    res.json({ message: 'Task status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTasksWithIntern = async (req, res) => {
  try {
    const rows = await Task.getAllTasksWithIntern();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const project_id = req.params.id;
    if (!project_id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }
    const tasks = await Task.getTasksByProject(project_id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



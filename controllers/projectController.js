const { Project, ProjectHistory } = require('../models');

exports.addProject = async (req, res) => {
  try {
    const { name, status } = req.body;
    console.log('addProject: Payload:', { name, status });

    if (!name) {
      console.log('addProject: Missing name');
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = await Project.create({ name, status: status || 'in_progress' });
    await ProjectHistory.create({
      project_id: project.id,
      intern_id: null,
      action: 'created',
      status: project.status || null,
      timestamp: new Date(),
    });
    res.status(201).json({ message: 'Project added' });
  } catch (err) {
    console.error('addProject: Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log('updateProjectStatus: Payload:', { id, status });

    if (!id || !status) {
      console.log('updateProjectStatus: Missing id or status');
      return res.status(400).json({ message: 'Project ID and status are required' });
    }

    const project = await Project.findByPk(id);
    if (!project) {
      console.log('updateProjectStatus: Project not found:', id);
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.status === 'completed' && status === 'in_progress') {
      console.log('updateProjectStatus: Invalid status transition');
      return res.status(400).json({ message: 'Cannot change status from completed to in_progress' });
    }

    await project.update({ status });
    await ProjectHistory.create({
      project_id: id,
      intern_id: null,
      action: 'status_updated',
      status: status || null,
      timestamp: new Date(),
    });
    res.json({ message: 'Project status updated' });
  } catch (err) {
    console.error('updateProjectStatus: Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    console.log('getAllProjects: Fetching projects');
    const projects = await Project.findAll();
    res.json(projects.map((p) => p.get({ plain: true })));
  } catch (err) {
    console.error('getAllProjects: Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const { InternProject, ProjectHistory, Project, Intern } = require('../models');

exports.assignProjects = async (req, res) => {
  try {
    const { intern_ids, project_id } = req.body;
    console.log('assignProjects: Payload:', { intern_ids, project_id });

    if (!intern_ids || !project_id || !Array.isArray(intern_ids) || !intern_ids.length) {
      console.log('assignProjects: Invalid input');
      return res.status(400).json({ error: 'Intern IDs and project ID are required' });
    }

    const project = await Project.findByPk(project_id);
    if (!project) {
      console.log('assignProjects: Project not found:', project_id);
      return res.status(404).json({ error: 'Project not found' });
    }

    const interns = await Intern.findAll({ where: { id: intern_ids } });
    if (interns.length !== intern_ids.length) {
      console.log('assignProjects: Some interns not found:', intern_ids);
      return res.status(404).json({ error: 'One or more interns not found' });
    }

    const assignments = intern_ids.map((intern_id) => ({
      intern_id,
      project_id,
    }));
    await InternProject.bulkCreate(assignments, { ignoreDuplicates: true });
    console.log('assignProjects: Assignments created');

    const historyEntries = intern_ids.map((intern_id) => ({
      project_id,
      intern_id,
      action: 'assigned',
      status: project.status || null,
      timestamp: new Date(),
    }));
    console.log('assignProjects: History entries:', historyEntries);
    await ProjectHistory.bulkCreate(historyEntries, { validate: true });
    console.log('assignProjects: History logged');

    res.status(201).json({ message: 'Projects assigned' });
  } catch (err) {
    console.error('assignProjects: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectsByIntern = async (req, res) => {
  if (req.user.role === 'student' && req.user.id !== Number(req.params.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const intern_id = parseInt(req.params.id, 10);
    console.log('getProjectsByIntern: intern_id:', intern_id);

    if (!intern_id || isNaN(intern_id)) {
      console.log('getProjectsByIntern: Invalid intern_id');
      return res.status(400).json({ error: 'Intern ID is required' });
    }

    const projects = await Project.findAll({
      include: [{ model: InternProject, where: { intern_id }, attributes: [] }],
    });
    res.json(projects.map((p) => p.get({ plain: true })));
  } catch (err) {
    console.error('getProjectsByIntern: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInternsByProject = async (req, res) => {
  try {
    const project_id = parseInt(req.params.id, 10);
    console.log('getInternsByProject: project_id:', project_id);

    if (!project_id || isNaN(project_id)) {
      console.log('getInternsByProject: Invalid project_id');
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const interns = await Intern.findAll({
      include: [{ model: InternProject, where: { project_id }, attributes: [] }],
    });
    res.json(interns.map((i) => i.get({ plain: true })));
  } catch (err) {
    console.error('getInternsByProject: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.unassignProjectFromInterns = async (req, res) => {
  try {
    const { intern_ids, project_id } = req.body;
    console.log('unassignProjectFromInterns: Payload:', { intern_ids, project_id });

    if (!intern_ids || !project_id || !Array.isArray(intern_ids) || !intern_ids.length) {
      console.log('unassignProjectFromInterns: Invalid input');
      return res.status(400).json({ error: 'Intern IDs and project ID are required' });
    }

    const project = await Project.findByPk(project_id);
    if (!project) {
      console.log('unassignProjectFromInterns: Project not found:', project_id);
      return res.status(404).json({ error: 'Project not found' });
    }

    await InternProject.destroy({ where: { project_id, intern_id: intern_ids } });
    console.log('unassignProjectFromInterns: Assignments deleted');

    const historyEntries = intern_ids.map((intern_id) => ({
      project_id,
      intern_id,
      action: 'unassigned',
      status: project.status || null,
      timestamp: new Date(),
    }));
    console.log('unassignProjectFromInterns: History entries:', historyEntries);
    await ProjectHistory.bulkCreate(historyEntries, { validate: true });
    console.log('unassignProjectFromInterns: History logged');

    res.status(200).json({ message: 'Interns unassigned from project' });
  } catch (err) {
    console.error('unassignProjectFromInterns: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAssignedInterns = async (req, res) => {
  try {
    console.log('getAllAssignedInterns: Fetching assignments');
    const assignments = await InternProject.findAll({
      attributes: ['project_id', 'intern_id'],
    });
    const map = {};
    assignments.forEach(({ project_id, intern_id }) => {
      if (!map[project_id]) map[project_id] = [];
      map[project_id].push(intern_id);
    });
    res.json(map);
  } catch (err) {
    console.error('getAllAssignedInterns: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.addProjectHistory = async (req, res) => {
  try {
    const project_id = parseInt(req.params.id, 10);
    const { action, status } = req.body;
    console.log('addProjectHistory: Payload:', { project_id, action, status });

    if (!project_id || isNaN(project_id) || !action) {
      console.log('addProjectHistory: Invalid input');
      return res.status(400).json({ error: 'Project ID and action are required' });
    }

    await ProjectHistory.create({
      project_id,
      intern_id: null,
      action,
      status: status || null,
      timestamp: new Date(),
    });
    res.json({ success: true });
  } catch (err) {
    console.error('addProjectHistory: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectHistory = async (req, res) => {
  try {
    const project_id = parseInt(req.params.id, 10);
    console.log('getProjectHistory: project_id:', project_id);

    if (!project_id || isNaN(project_id)) {
      console.log('getProjectHistory: Invalid project_id');
      return res.status(400).json({ error: 'Project ID must be a valid number' });
    }

    const project = await Project.findByPk(project_id);
    if (!project) {
      console.log('getProjectHistory: Project not found:', project_id);
      return res.status(404).json({ error: 'Project not found' });
    }

    const history = await ProjectHistory.findAll({
      where: { project_id },
      order: [['timestamp', 'DESC']],
    });
    res.json(history.map((h) => h.get({ plain: true })));
  } catch (err) {
    console.error('getProjectHistory: Error:', err);
    res.status(500).json({ error: err.message });
  }
};
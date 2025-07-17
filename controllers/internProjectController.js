

 const InternProject = require('../models/internProjectModel');

exports.addProjectHistory = async (req, res) => {
  const project_id = req.params.id;
  const { action, status } = req.body;
  try {
    await InternProject.addProjectHistory(project_id, action, status);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProjectHistory = async (req, res) => {
  try {
    const project_id = req.params.id;
    if (!project_id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }
    const history = await InternProject.getProjectHistory(project_id);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.assignProjects = async (req, res) => {
  try {
    const { intern_ids, project_id } = req.body;
    if (!intern_ids || !project_id) {
      return res.status(400).json({ error: 'Intern IDs and project ID are required' });
    }
    await InternProject.assignProjectToInterns(intern_ids, project_id);
    res.status(201).json({ message: 'Projects assigned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectsByIntern = async (req, res) => {
  try {
    const intern_id = req.params.id;
    if (!intern_id) {
      return res.status(400).json({ error: 'Intern ID is required' });
    }
    const projects = await InternProject.getProjectsByIntern(intern_id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInternsByProject = async (req, res) => {
  try {
    const project_id = req.params.id;
    if (!project_id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }
    const [interns] = await InternProject.getInternsByProject(project_id);
    res.json(interns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unassignProjectFromInterns = async (req, res) => {
  try {
    const { intern_ids, project_id } = req.body;
    if (!intern_ids || !project_id) {
      return res.status(400).json({ error: 'Intern IDs and project ID are required' });
    }
    await InternProject.unassignProjectFromInterns(intern_ids, project_id);
    res.status(200).json({ message: 'Interns unassigned from project' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAssignedInterns = async (req, res) => {
  try {
    const assignedMap = await InternProject.getAllAssignedInterns();
    res.json(assignedMap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 const InternProject = require('../models/internProjectModel');

exports.assignProjects = async (req, res) => {
  try {
      const internId = req.params.id;
      const { project_ids } = req.body;
      await InternProject.assignProjectsToIntern(internId, project_ids);
      res.status(201).json({ message: 'Projects assigned' });
    } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

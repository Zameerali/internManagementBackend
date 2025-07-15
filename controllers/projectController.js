const Project = require('../models/projectModel');

exports.addProject = async (req, res) => {
    try{
        const {name, status} = req.body;
        await Project.createProject(name, status || 'in_progress');
        res.status(201).json({ message: 'Project added' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateProjectStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({ message: 'Project ID and status are required' });
        }
        const projects = await Project.getAllProjects();
        const project = projects.find(p => p.id == id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.status === 'completed' && status === 'in_progress') {
            return res.status(400).json({ message: 'Cannot change status from completed to in_progress' });
        }
        await Project.updateProjectStatus(id, status);
        res.json({ message: 'Project status updated' });
    } catch (error) {
        console.error('Error updating project status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.getAllProjects();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

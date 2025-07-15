const Project = require('../models/projectModel');

exports.addProject = async (req, res) => {
    try{
        const {name} = req.body;
    await Project.createProject(name);
    res.status(201).json({ message: 'Project added' });
} catch (error) {
    console.error('Error adding project:', error);
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

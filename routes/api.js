const express = require('express');
const router = express.Router();

const internController = require('../controllers/internController');
const taskController = require('../controllers/taskController');
const internProjectController = require('../controllers/internProjectController');
const projectController = require('../controllers/projectController');
router.get('/interns', internController.getAllInterns);
router.get('/interns/:id/profile', internController.getInternWithProfile);
router.post('/interns', internController.createIntern);


router.get('/interns/tasks/:id', taskController.getTasksByProject);
router.post('/interns/:id/tasks', taskController.addTask);
router.get('/interns/:id/tasks', taskController.getTasksByIntern);
router.put('/tasks/status', taskController.updateTaskStatus);
router.get('/tasks/full', taskController.getAllTasksWithIntern);


router.get('/assigned-interns', internProjectController.getAllAssignedInterns);
router.post('/interns/projects', internProjectController.assignProjects);
router.get('/interns/:id/projects', internProjectController.getProjectsByIntern);
router.get('/projects/:id/interns', internProjectController.getInternsByProject);
router.get('/interns/project', projectController.getAllProjects);
router.post('/interns/project', projectController.addProject);
router.put('/projects/status', projectController.updateProjectStatus);
router.post('/interns/projects/unassign', internProjectController.unassignProjectFromInterns);
router.get('/projects/:id/history', internProjectController.getProjectHistory);
router.post('/projects/:id/history', internProjectController.addProjectHistory);


module.exports = router;

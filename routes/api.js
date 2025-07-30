const express = require('express');
const router = express.Router();

const internController = require('../controllers/internController');
const taskController = require('../controllers/taskController');
const internProjectController = require('../controllers/internProjectController');
const projectController = require('../controllers/projectController');
const userProfileController = require('../controllers/userProfileController');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

router.use(auth);

router.get('/auth/profile/me', userProfileController.getMyProfile);
router.put('/auth/profile/me', userProfileController.updateMyProfile);

router.post('/interns', requireAdmin, internController.createIntern);
router.post('/interns/project', requireAdmin, projectController.addProject);
router.put('/projects/status', requireAdmin, projectController.updateProjectStatus);
router.post('/interns/projects', requireAdmin, internProjectController.assignProjects);
router.post('/interns/projects/unassign', requireAdmin, internProjectController.unassignProjectFromInterns);
router.post('/projects/:id/history', requireAdmin, internProjectController.addProjectHistory);
router.get('/projects/:id/history', requireAdmin, internProjectController.getProjectHistory);
router.post('/interns/:id/tasks', requireAdmin, taskController.addTask);
router.get('/assigned-interns', requireAdmin, internProjectController.getAllAssignedInterns);
router.get('/projects/:id/interns', requireAdmin, internProjectController.getInternsByProject);
router.get('/interns/project', requireAdmin, projectController.getAllProjects);
router.get('/interns', requireAdmin, internController.getAllInterns);
router.get('/tasks/full', requireAdmin, taskController.getAllTasksWithIntern);

router.get('/interns/:id/profile', internController.getInternWithProfile);
router.get('/interns/:id/projects', internProjectController.getProjectsByIntern);
router.get('/interns/:id/tasks', taskController.getTasksByIntern);
router.put('/tasks/status', taskController.updateTaskStatus);
router.get('/tasks/my', taskController.getMyTasks);

module.exports = router;
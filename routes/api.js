const express = require('express');
const router = express.Router();

const internController = require('../controllers/internController');
const taskController = require('../controllers/taskController');
const internProjectController = require('../controllers/internProjectController');
const projectController = require('../controllers/projectController');
router.get('/interns', internController.getAllInterns);
router.get('/interns/:id/profile', internController.getInternWithProfile);

router.post('/interns/:id/tasks', taskController.addTask);
router.get('/interns/:id/tasks', taskController.getTasksByIntern);
router.put('/tasks/status', taskController.updateTaskStatus);
router.get('/tasks/full', taskController.getAllTasksWithIntern);


router.post('/interns/:id/projects', internProjectController.assignProjects);

router.get('/interns/project', projectController.getAllProjects )
router.post('/interns/project', projectController.addProject )


module.exports = router;

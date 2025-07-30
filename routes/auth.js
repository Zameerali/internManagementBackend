const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-intern-email', authController.checkInternEmailExists); // NEW ROUTE
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuth);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);


router.post('/login', authController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful, clears JWT cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 */
router.post('/logout', authController.logout);

router.get('/check-auth', authController.checkAuth);
module.exports = router;

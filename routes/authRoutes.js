const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/adduser', authController.adduser_get);
router.post('/adduser', authController.adduser_post);
router.get('/logout', authController.logout_get);


module.exports = router;
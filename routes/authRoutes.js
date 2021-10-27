const { Router } = require('express');
const authController = require('../controllers/authController');
const pagesController = require('../controllers/pagesController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');



const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/users', authController.adduser_get);
router.post('/users', authController.adduser_post);
router.get('/tickets', requireAuth, pagesController.addTicket_get);
router.post('/tickets', requireAuth, pagesController.addTicket_post);


module.exports = router;


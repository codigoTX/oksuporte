const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const { addTicket_get, addTicket_post } = require('../controllers/ticketsController');
const { addOrder_get, addOrder_post } = require('../controllers/ordersController');
//-------------------------------------------------------------------------------------



const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/users', authController.adduser_get);
router.post('/users', authController.adduser_post);
router.get('/tickets', requireAuth, addTicket_get);
router.post('/tickets', requireAuth, addTicket_post);
router.get('/orders', requireAuth, addOrder_get);
router.post('/orders', requireAuth, addOrder_post);



module.exports = router;
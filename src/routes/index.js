const router = require('express').Router();
const { login, home, tickets, orders, preferences, info, help } = require('../controllers/defaultController');
const { addUser, crudUsers } = require('../controllers/userController');

router.get('/', login);
router.get('/home', home);
router.get('/tickets', tickets);
router.get('/orders', orders);
router.get('/info', info);
router.get('/preferences', preferences);
router.get('/help', help);
router.get('/crud_users', crudUsers);
router.post('/listagem', addUser);

module.exports = router;
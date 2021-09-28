const router = require('express').Router();
const { login, home, tickets, orders, info, help } = require('../controllers/defaultController');
const preferences = require('../controllers/preferencesController');

router.get('/', login);
router.get('/home', home);
router.get('/tickets', tickets);
router.get('/orders', orders);
router.get('/info', info);
router.get('/preferences', preferences);
router.get('/help', help);

module.exports = router;
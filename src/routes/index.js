const router = require('express').Router();
// const home = require('../controllers/defaultController');
// const tickets = require('../controllers/defaultController');
// const orders = require('../controllers/defaultController');
// const tips = require('../controllers/defaultController');
const { home, tickets, orders, tips } = require('../controllers/defaultController');
const settings = require('../controllers/settingsController');

router.get('/', home);
router.get('/tickets', tickets);
router.get('/orders', orders);
router.get('/tips', tips);
router.get('/settings', settings);

module.exports = router;
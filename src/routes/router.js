const router = require('express').Router();
const { login, home, tickets, orders, preferences, info, help } = require('../controllers/DefaultController');
const { addUser, crudUsers} = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const TicketController = require('../controllers/TicketController');
const OrderController = require('../controllers/OrderController');
const CompanyController = require('../controllers/CompanyController');
const InfoController = require('../controllers/InfoController');

const Auth = require('../middlewares/Auth');

const AuthValidator = require('../validators/AuthValidator');

router.get('/ping', (req, res) => {
  res.json({pong: true});
});

router.get('/companies', UserController.showCompaniesList);
router.get('/user/me', UserController.showUserInfo);
// router.post('/user/add', UserController.addUser);
router.put('/user/me', UserController.editUser);

router.post('/user/add', AuthValidator.addUser, AuthController.addUser);

router.post('/ticket/add', TicketController.addTicket);
router.get('/ticket/list', TicketController.getTicketsList);
router.get('/ticket/item', TicketController.getTicket);
router.post('/ticket/:id', TicketController.editTicket);


router.post('/order/add', OrderController.addOrder);
router.get('/order/list', OrderController.getOrdersList);
router.get('/order/item', OrderController.getOrder);
router.post('/order/:id', OrderController.editOrder);

router.post('/company/add', CompanyController.addCompany);
router.get('/company/list', CompanyController.getCompaniesList);
router.get('/company/item', CompanyController.getCompany);
router.post('/company/:id', CompanyController.editCompany);

router.post('/info/add', InfoController.addInfo);
router.get('/info/list', InfoController.getInfosList);
router.get('/info/item', InfoController.getInfo);
router.post('/info/:id', InfoController.editInfo);

// REVISADOS
router.get('/', login);
router.post('/home', AuthValidator.signIn, AuthController.signIn, Auth.private);
router.get('/home', Auth.private, home);
// REVISADOS




router.get('/tickets', tickets);
router.get('/orders', orders);
router.get('/info', info);
router.get('/preferences', preferences);
router.get('/help', help);
router.get('/user/crud', UserController.crudUsers);
// router.post('/listagem', UserController.addUser);

module.exports = router;
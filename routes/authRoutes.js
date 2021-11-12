const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const { addTicket_get, addTicket_post } = require('../controllers/ticketsController');
const { addOrder_get, addOrder_post, uploadProject } = require('../controllers/ordersController');

const router = Router();

const multer = require('multer');
const Order = require('../models/Order');

const upload = multer({ dest: './uploaded' });

// const fileStorageEngine = multer.diskStorage({
//   destination:(req, file, cb) => {
//     cb(null,'./tmp');
//   },
//   filename:(req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   }
// });

// const upload = multer({ storage: fileStorageEngine });


//-------------------------------------------------------------------------------------

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/users', authController.adduser_get);
router.post('/users', authController.adduser_post);
router.get('/tickets', requireAuth, addTicket_get);
router.post('/tickets', requireAuth, addTicket_post);
router.get('/orders', requireAuth, addOrder_get);
// router.post('/orders', requireAuth, upload.single('attachment'), uploadProject, addOrder_post);
router.post('/orders', requireAuth, upload.single('attachment'), addOrder_post);

router.get('/upload', (req, res) => res.render('upload'));
router.post('/upload', upload.single('attachment'), (req, res) => {
  console.log(req.body, req.file);
  res.send('ok');
});

router.get('/download', uploadProject);
   

// -------------------------------------------------
  // const filePath = `uploaded/asd.pdf`;
  // const filePath = addOrder_post.orderFile;
  // const filePath = `uploaded/ba3dc5e8e25dbd3443e942d273d5aef1`;
  // res.download(filePath); 
 

module.exports = router;
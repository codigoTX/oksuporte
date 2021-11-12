const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const Order = require('./models/Order');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB;
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('login'));
app.get('/home', requireAuth, (req, res) => res.render('template', {pageDetails: { home: true, title: 'Minino Móveis Planejados'} }));
app.get('/config', requireAuth, (req, res) => res.render('template', {pageDetails: { config: true, title: 'CONFIGURAÇÕES'} }));
app.get('/info', requireAuth, (req, res) => res.render('template', {pageDetails: { info: true, title: 'INFORMAÇÕES ÚTEIS'} }));
app.get('/help', (req, res) => res.render('template', {pageDetails: { help: true, title: 'FALE CONOSCO'} }));

app.use(authRoutes);
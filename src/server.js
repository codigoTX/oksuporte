require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const mustache = require('mustache-express');
const path = require('path');

const mainRoutes = require('./routes/router');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log("Erro: ", error.message);
});

const server = express();

server.set('view engine', "mustache");
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static('public'));

server.use(mainRoutes);
server.use((req, res) => {
  res.send('ESSA PÁGINA NÃO EXISTE...')
});

server.listen(process.env.PORT, () => {
  console.log(`Running at ${process.env.BASE}`);
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const mainRoutes = require('./routes/index');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log("Erro: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.get('/ping', (req, res) => {
  res.json({pong: true});
});

//CANIL
server.use(mainRoutes);
server.use((req, res) => {
  res.send('ESSA PÁGINA NÃO EXISTE...')
});
//CANIL



server.listen(process.env.PORT, () => {
  console.log(`Rodando no endereço: ${process.env.BASE}`);
});
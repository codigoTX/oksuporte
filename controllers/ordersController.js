const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


module.exports.addOrder_get = (req, res) => {  
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    console.log(user);
    let loggedUser = {id: user.id, name: user.name};     

    Order.find({userId: loggedUser.id}, function(err, orders){

      res.render('template', {
        pageDetails: {
          ordersPage: true,
          title: 'LISTA DE PEDIDOS'
        },
        ordersList: orders
      })
    })
  });    
}

module.exports.addOrder_post = async (req, res) => {
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    let loggedUser = {id: user.id, name: user.name, company: user.company};   
  
  const { userId, requester, company, finalClient, title, obs, attachment, startedAt, deadline, concludedAt, interactions, price, stage } = req.body;

  try {
    const order = await Order.create({ 
      userId: loggedUser.id, 
      requester: loggedUser.name, 
      company: loggedUser.company,
      finalClient,
      title, 
      obs,       
      attachment, 
      startedAt,
      deadline: "40 dias",
      concludedAt,
      interactions, // receberá um array de strings, essas strings serão as mensagens
      price: 2125,
      stage // Enviado, Recebido, Produção, Embalagem, Retirada, Montagem, Concluído, Cancelado, Pausado
    });
    console.log("pedido cadastrado com sucesso");
    res.status(201).json({ order: order._id });
  }
  catch(err) {
    // const errors = handleErrors(err);
    console.log("erro ao tentar cadastrar pedido");
    res.status(400).json({ errors });
  } 
})}
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();



module.exports.addOrder_get = (req, res) => {  
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
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
};

var attachedFile = '';

module.exports.addOrder_post = async (req, res) => {
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    let loggedUser = {id: user.id, name: user.name, company: user.company};   
    
  const { userId, requester, company, finalClient, title, obs, attachment=req.file, startedAt, deadline, concludedAt, interactions, price, stage } = req.body;

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

    // console.log('CAMINHO LINK DO ARQUIVO ANEXADO: ', attachment.path);
    console.log("pedido cadastrado com sucesso");
    // console.log(req.file);
    console.log("arquivo anexado: ", attachment); 


    // res.status(201).json({ order: order._id });
    res.status(201);
    res.redirect('/orders');
  }
  catch(err) {
    // const errors = handleErrors(err);
    console.log("erro ao tentar cadastrar pedido");
    // res.status(400).json({ errors });
  } 
});


};


module.exports.uploadProject = async (req, res) => {  
// const filePath = `uploaded/ba3dc5e8e25dbd3443e942d273d5aef1`;

  Order.findOne('filename', )
  res.download(`uploaded/${attachedFile}`);


  console.log(attachedFile);

};

module.exports.orderDetails = async(req, res) => {

  const ordersTable = document.querySelector('#table-orders');
  const rows = ordersTable.querySelectorAll('tr');  
  rows.forEach(row => {
    row.addEventListener('click', (e) => {
      const clickedOrderId = e.target.parentNode.firstElementChild;

      Order.findById(order.id);

      console.log(clickedOrderId);
    })
  });

}  

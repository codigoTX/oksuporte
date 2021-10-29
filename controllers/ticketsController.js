const Ticket = require('../models/Ticket');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


module.exports.addTicket_get = (req, res) => {  
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    console.log(user);
    let loggedUser = {id: user.id, name: user.name};     

    Ticket.find({userId: loggedUser.id}, function(err, tickets){

      res.render('template', {
        pageDetails: {
          ticketsPage: true,
          title: 'LISTA DE CHAMADOS'
        },
        ticketsList: tickets
      })
    })
  });    
}

module.exports.addTicket_post = async (req, res) => {
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    let loggedUser = {id: user.id, name: user.name, company: user.company};   
  
  const { userId, company, requester, title, serial, description, attachment, openedAt, closedAt, status, interactions  } = req.body;

  try {
    const ticket = await Ticket.create({ 
      userId: loggedUser.id, 
      company: loggedUser.company,
      requester: loggedUser.name, 
      title, 
      serial, 
      description, 
      attachment, 
      openedAt,
      closedAt,
      status, 
      interactions // receberá um array de strings, essas strings serão as mensagens 
    });
    console.log("ticket cadastrado com sucesso");
    res.status(201).json({ ticket: ticket._id });
  }
  catch(err) {
    // const errors = handleErrors(err);
    console.log("erro ao tentar cadastrar ticket");
    // res.status(400).json({ errors });
  } 
})}
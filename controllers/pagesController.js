const Ticket = require('../models/Ticket');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


module.exports.addTicket_get = (req, res) => {  
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    console.log(user);
    var loggedUser = {id: user.id, name: user.name}; 
    

    Ticket.find({userId: loggedUser.id}, function(err, tickets){
      res.render('template', {
        pageDetails: {
          ticketsPage: true,
          title: 'GERENCIAMENTO DE USUÁRIOS'
        },
        ticketsList: tickets
      })
    })
  });    
}//fim do addTicket_get


module.exports.addTicket_post = async (req, res) => {
  token = req.cookies.jwt;    
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {    
    var user = await User.findById(decodedToken.id); 
    // var loggedUser = user.id;
    // var loggedUserName = user.name;
    var loggedUser = {id: user.id, name: user.name}; 

  
  
  
  const { userId, title, serial, description, attachment, createdAt, finished, closedAt } = req.body;

  try {
    const ticket = await Ticket.create({ userId: loggedUser.id, ticketOwner: loggedUser.name, title, serial, description, attachment, createdAt, status, closedAt });
    console.log("ticket cadastrado com sucesso");
    res.status(201).json({ ticket: ticket._id });
  }
  catch(err) {
    // const errors = handleErrors(err);
    console.log("erro ao tentar cadastrar ticket");
    // res.status(400).json({ errors });
  } 
})}
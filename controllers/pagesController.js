const Ticket = require('../models/Ticket');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

var loggedUser = 'sem usuário';

module.exports.addTicket_get = (req, res, next) => { 
  
  token = req.cookies.jwt;
    
  jwt.verify(token, 'txcode', async (err, decodedToken) => {
    if (err) {
      res.locals.user = null;
      next();
    } else {
      var user = await User.findById(decodedToken.id);
      loggedUser = decodedToken.name;
      res.locals.user = user;
      next();
    }
  });
    
  
  Ticket.find({attachment: ''}, function(err, tickets){
    res.render('template', {
      pageDetails: {
        ticketsPage: true,
        title: 'GERENCIAMENTO DE USUÁRIOS'
      },
      ticketsList: tickets
    })
  })
}

module.exports.addTicket_post = async (req, res) => {
  const { user, title, serial, description, attachment, createdAt, finished, closedAt } = req.body;

  try {
    const ticket = await Ticket.create({ user: loggedUser, title, serial, description, attachment, createdAt, finished, closedAt });
    console.log("ticket cadastrado com sucesso");
    res.status(201).json({ ticket: ticket._id });

    

  }
  catch(err) {
    // const errors = handleErrors(err);
    console.log("erro ao tentar cadastrar ticket");
    // res.status(400).json({ errors });
  } 
}
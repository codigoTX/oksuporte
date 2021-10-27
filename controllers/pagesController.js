const Ticket = require("../models/Ticket");


module.exports.addTicket_get = (req, res) => {    

  Ticket.find({}, function(err, tickets){
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
    const ticket = await Ticket.create({ user, title, serial, description, attachment, createdAt, finished, closedAt });
    console.log("ticket cadastrado com sucesso");
    res.status(201).json({ ticket: ticket._id });
  }
  catch(err) {
    // const errors = handleErrors(err);
    console.log("erro ao tentar cadastrar ticket");
    // res.status(400).json({ errors });
  } 
}
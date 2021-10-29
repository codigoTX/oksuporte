const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  companyId: {
    type: String
  },
  requester:{
    type: String
  },
  title: {
    type: String,
    required: [true, 'Insira um título']
  },
  serial: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Faça a descrição do problema']
  },
  attachment: {
    type: String
  },
  openedAt: {
    type: Date, default: Date.now
  },
  status: {
    type: Boolean, default: true
  },
  closedAt: {
    type: Date
  },
  interactions:{
    type: Array
  }
});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
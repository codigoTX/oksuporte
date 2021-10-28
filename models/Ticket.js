const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  ticketOwner:{
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
  createdAt: {
    type: Date, default: Date.now
  },
  status: {
    type: Boolean, default: false
  },
  closedAt: {
    type: Date
  }
});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
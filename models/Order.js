const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  requester:{
    type: String
  },
  title: {
    type: String,
    required: [true, 'Insira um título para esse pedido']
  },
  obs: {
    type: String,
  },
  attachment: {
    type: String
  },
  startedAt: {
    type: Date, default: Date.now
  },
  concludedAt: {
    type: Date
  },
  interactions:{
    type: Array
  },
  price: {
    type: Number
  },
  stage: {
    type: String, default: 'Enviado'
  }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
const { Schema, connection, model } = require('mongoose');

require('mongoose');

const schema = new Schema({
  userId: {type: String},
  companyId: {type: String},
  title: {type: String, required: false},
  obs: {type: String, required: false},
  attachment: {type:File},
  status: {type: String},
  deliveryAddress: {type: String},
  createdAt: {type: Date},  
  deadline: {type: Date},  /*fazer contagem regressiva do prazo*/
  finishedAt: {type: Date}  
});

const modelName = 'Order';

module.exports = (connection && connection.models[modelName]) ?
  connection.models[modelName] : model(modelName, schema);
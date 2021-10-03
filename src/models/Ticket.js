const { Schema, connection, model } = require('mongoose');

require('mongoose');

const schema = new Schema({
  userId: {type: String},
  companyId: {type: String},
  title: {type: String, required: false},
  description: {type: String, required: false},
  attachment: {type:File},
  status: {type: String},
  createdAt: {type: Date},  
  finishedAt: {type: Date}  
});

const modelName = 'Ticket';

module.exports = (connection && connection.models[modelName]) ?
  connection.models[modelName] : model(modelName, schema);

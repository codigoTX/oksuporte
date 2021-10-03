const { Schema, connection, model } = require('mongoose');

require('mongoose');


const schema = new Schema({
  companyId: {type: String, required: false},
  name: {type: String, required: false},
  email: {type: String, required: false},
  passwordHash: {type: String, required: false},
  token: {type: String},
  createdAt: {type: Date, required: false},
  active: {type: Boolean, required: false}
});

const modelName = 'User';

module.exports = (connection && connection.models[modelName]) ?
  connection.models[modelName] : model(modelName, schema);

const { Schema, connection, model } = require('mongoose');

require('mongoose');

const schema = new Schema({
  companyId: {type: String, required: false},
  name: {type: String, required: false},
  email: {type: String, required: false},
  password: {type: String, required: false},
  createdAt: {type: Date, required: false}
});

const modelName = 'User';

module.exports = (connection && connection.models[modelName]) ?
  connection.models[modelName] : model(modelName, schema);

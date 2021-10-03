const { Schema, connection, model } = require('mongoose');

require('mongoose');

const schema = new Schema({
  name: {type: String, required: false},
  representant: {type: String, required: false},
  city: {type: String, required: false},
  state: {type: String, required: false},
  phone: {type: String, required: false},
  createdAt: {type: Date, required: false},
  active: {type: Boolean, required: false}
});

const modelName = 'Company';

module.exports = (connection && connection.models[modelName]) ?
  connection.models[modelName] : model(modelName, schema);
const { Schema, connection, model } = require('mongoose');

require('mongoose');

const schema = new Schema({
  title: {type: String, required: false},
  description: {type: String, required: false},
  attachment: {type:File},
  createdAt: {type: Date}
});

const modelName = 'Info';

module.exports = (connection && connection.models[modelName]) ?
  connection.models[modelName] : model(modelName, schema);
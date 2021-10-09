const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  companyId: {
    type: String
  },
  // name: {
  //   type: String,
  //   required: [true, 'Por favor insira um nome válido'],
  //   minlength: 2
  // },
  email: {
    type: String,
    required: [true, 'Por favor insira um e-mail'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Por favor insira um e-mail válido']
  },
  password: {
    type: String,
    required: [true, 'Por favor insira uma senha.'],
    minlength: [6, 'A senha precisa ter no mínimo 6 caractéres']
  },
  createAt: {
    type: Date
  }
});

// criptografa a senha antes de salvar no banco
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// verificando se os dados informados já foram cadastrados
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
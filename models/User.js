const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  company: {
    type: String
  },
  name: {
    type: String
  },
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
  userType: {
    type: String
  },
  createAt: {
    type: Date, default: new Date
  }
});

// criptografa a senha antes de salvar no banco
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('senha incorreta');
  }
  throw Error('e-mail incorreto');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
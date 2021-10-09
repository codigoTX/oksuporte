const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'E-mail e/ou senha incorreto(s).';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'E-mail e/ou senha incorreto(s).';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'Esse e-mail já está cadastrado.';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// gera o token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'txcode', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.adduser_get = (req, res) => {
  // res.render('users');
  res.render('template', {pageDetails: { users: true, title: 'GERENCIAMENTO DE USUÁRIOS'} });
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.adduser_post = async (req, res) => {
  const { companyId, name, email, password, createdAt } = req.body;

  try {
    const user = await User.create({ companyId, name, email, password, createdAt });
    // const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
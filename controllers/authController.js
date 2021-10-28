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

  // alerta sobre e-mail já cadastrado
  if (err.code === 11000) {
    errors.email = 'Esse e-mail já está cadastrado.';
    return errors;
  }

  // validation errors
  if (err.message.includes('falha na validação do usuário')) {
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
const createToken = (id, name) => {
  return jwt.sign({ id, name }, 'txcode', {
    expiresIn: maxAge
  });
};

// Ações das controllers
module.exports.adduser_get = (req, res) => {    

  User.find({}, function(err, users){
    res.render('template', {
      pageDetails: {
        usersPage: true,
        title: 'GERENCIAMENTO DE USUÁRIOS'
      },
      usersList: users
    })
  })
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.adduser_post = async (req, res) => {
  const { company, name, email, password, userType, createdAt } = req.body;

  try {
    const user = await User.create({ company, name, email, password, userType, createdAt });
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
    const token = createToken(user._id, user.name, user.email, user.company, user.userType, user.createdAt );

    
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
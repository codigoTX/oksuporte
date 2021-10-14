const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // verifica se o token existe e se é válido.
  if (token) {
    jwt.verify(token, 'txcode', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/erro1');
      } else {
        console.log(decodedToken);
        // res.json({ userCompany: decodedToken.company })
        next();
      }
    });
  } else {
    res.redirect('/erro2');
  }
};

// verifica o usuário logado
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'txcode', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };
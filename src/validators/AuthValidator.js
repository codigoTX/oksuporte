const { checkSchema } = require('express-validator');

module.exports = {
  addUser: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: { min: 2}
      },
      errorMessage: 'Insira um nome com no mínimo dois caractéres.'
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Insira um e-mail válido, ele será o seu login.'
    },
    password: {
      isLength: {
        options: {min: 5}
      },
      errorMessage: 'A senha precisa ter ao menos 5 caractéres.'
    }
  }),
  signIn: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Informe o e-mail que foi utilizado no cadastro.'
    },
    password: {
      isLength: {
        options: {min: 5}
      },
      errorMessage: 'A senha precisa ter ao menos 5 caractéres.'
    }
  })
};
const { validationResult, matchedData } = require('express-validator');

const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = {
  signIn: async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({error: errors.mapped()});
      return;
    };
    const data = matchedData(req);

    //Validando o email
    const user = await User.findOne({email: data.email}); //verifica se existe algum usuário cadastrado com o e-mail informado.

    if(!user){
      res.json({error: 'E-mail e/ou senha incorretosEMAIL!'});
      return;
    }

    //Validando a senha
    const match = await bcrypt.compare(data.password, user.passwordHash); //Compara a senha informada com a senha do banco.
    if(!match){
      res.json({error: 'E-mail e/ou senha incorreto(s)!'});
      return;
    }

    //Gerando Token
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();

    res.render('pages/template', {
      pageDetails: {
        title: 'ESCOLHA A OPÇÃO DESEJADA',
        home: true
      }
    });  
    
  },
  addUser: async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({error: errors.mapped()});
      return;
    };
    const data = matchedData(req);

    const user = await User.findOne({email: data.email});
    if(user){
      res.json({
        error: {email: {msg: 'E-mail já cadastrado!'}}
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      companyId: 'xxx',
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: Date(),
      token
    });
    await newUser.save();

    res.render({token});
  }
};

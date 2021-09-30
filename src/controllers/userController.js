const express = require('express');
const User = require('../models/User');


let users = User.find({}).sort({"name": 1});

const crudUsers = (req, res) => {
  res.render('pages/template', {
    pageDetails: {
      title: 'GERENCIAMENTO DE USUÁRIOS',
      crud_users: true 
      }
  });
}

const addUser = async (req, res) => {
  let newUser = new User(); 
  newUser.companyId = '001',
  newUser.name = req.body.name,
  newUser.email = req.body.email,
  newUser.password = req.body.password,
  newUser.createdAt = Date();
  try{
    res.render('pages/template', {
      pageDetails: {
        title: 'GERENCIAMENTO DE USUÁRIOS',
        crud_users: true 
      }
    });
    await newUser.save();
    console.log('add ok');
  }
  catch(error){
    console.log("add fail", error);
  };
};

//Exportando para a index.
module.exports = { crudUsers, addUser };
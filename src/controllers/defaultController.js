const express = require('express');
const User = require('../models/User');


const login = (req, res) => {
  res.render('pages/login');
};
const home = (req, res) => {
  let token = req.query.token;



};
const tickets = (req, res) => {
  res.render('pages/template', {
    pageDetails: {
      title: 'LISTA DE TICKETS',
      tickets: true
    }
  });
};
const orders = (req, res) => {
  res.render('pages/template', {
    pageDetails: {
      title: 'LISTA DE PEDIDOS',
      orders: true
    }
  });
};
const preferences = (req, res) => {
  res.render('pages/template', {
    pageDetails: {
      title: 'PREFERÊNCIAS',
      preferences: true
    }
  });
};
const info = (req, res) => {
  res.render('pages/template', {
    pageDetails: {
      title: 'INFORMAÇÕES/DICAS',
      info: true
    }
  });
};
const help = (req, res) => {
  res.render('pages/template', {
    pageDetails: {
      title: 'PÁGINA DE AJUDA/CONTATO',
      help: true
    }
  });
};

//Exportando para a router.
module.exports = { login, home, tickets, orders, preferences, info, help };
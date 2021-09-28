const express = require('express');

const login = (req, res) => {
  res.render('pages/login');
};

const home = (req, res) => {
  res.render('pages/home');
};

const tickets = (req, res) => {
  res.render('pages/tickets');
};

const orders = (req, res) => {
  res.render('pages/orders');
};

const info = (req, res) => {
  res.render('pages/info');
};

const help = (req, res) => {
  res.render('pages/help');
};

//Exportando para a index.
module.exports = {login, home, tickets, orders, info, help};
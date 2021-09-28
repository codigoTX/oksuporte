const express = require('express');

const home = (req, res) => {
  res.send('ESSA É A HOME');
};

const tickets = (req, res) => {
  res.send('TICKETS');
};

const orders = (req, res) => {
  res.send('PEDIDOS');
};

const tips = (req, res) => {
  res.send('DICAS');
};


module.exports = {home, tickets, orders, tips};
const express = require('express');

const preferences = (req, res) => {
  res.render('pages/preferences');
};

module.exports = preferences;
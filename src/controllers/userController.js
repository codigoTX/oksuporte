const express = require('express');
const User = require('../models/User');
const Company = require('../models/Company');

//-------------------------------------------------------------------------
module.exports = {
  showCompaniesList: async (req, res) => {
    let companies = await Company.find();
    res.json({companies});
  },
  crudUsers: (req, res) => {
    res.render('pages/template', {
      pageDetails: {
        title: 'GERENCIAMENTO DE USUÁRIOS',
        userCrud: true 
        }
    });
  },
  // addUser: async (req, res) => {
  //   let newUser = new User(); 
  //   newUser.companyId = '001',
  //   newUser.name = req.body.name,
  //   newUser.email = req.body.email,
  //   newUser.passwordHash = req.body.password,
  //   newUser.createdAt = Date();
  //   try{
  //     res.render('pages/template', {
  //       pageDetails: {
  //         title: 'GERENCIAMENTO DE USUÁRIOS',
  //         userCrud: true 
  //       }
  //     });
  //     await newUser.save();
  //     console.log('add ok');
  //   }
  //   catch(error){
  //     console.log("add fail", error);
  //   };
  // },
  showUserInfo: async (req, res) => {

  },
  editUser: async (req, res) => {

  },
};




//-------------------------------------------------------------------------
// let users = User.find({}).sort({"name": 1});

// const crudUsers = (req, res) => {
//   res.render('pages/template', {
//     pageDetails: {
//       title: 'GERENCIAMENTO DE USUÁRIOS',
//       user/crud: true 
//       }
//   });
// }

// const addUser = async (req, res) => {
//   let newUser = new User(); 
//   newUser.companyId = '001',
//   newUser.name = req.body.name,
//   newUser.email = req.body.email,
//   newUser.password = req.body.password,
//   newUser.createdAt = Date();
//   try{
//     res.render('pages/template', {
//       pageDetails: {
//         title: 'GERENCIAMENTO DE USUÁRIOS',
//         user/crud: true 
//       }
//     });
//     await newUser.save();
//     console.log('add ok');
//   }
//   catch(error){
//     console.log("add fail", error);
//   };
// };

// //Exportando para a router.
// module.exports = { crudUsers, addUser };
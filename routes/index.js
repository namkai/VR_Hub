'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const boom = require('boom');

//COOKIE EXISTING OR NOT PLEASE

const authorize = function(req, res, next){
  if(!req.session.userId){
    return next(boom.create(400, "You are not logged in"));
  }
  next();
}

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'VR Hub' });
// });
router.get('/', function(req, res, next){
  knex('users_projects').then(function(data){
    console.log(data);
    res.json(data);
  })
  .catch(function(err){
    next(err);
  })
});

router.get('/home',authorize, function(req,res,next){
  console.log(req.session);
  res.render('home');
})








// router.post('/register', function(req, res, next){
//
//   var insert = {};
//   insert.username = req.body.username;
//   insert.password = req.body.password;
//   insert.project = req.body.project;
//
//   knex('users_projects').insert(insert).returning('*').then(function(data){
//     console.log(data);
//     res.send(data);
//     console.log("hello");
//   })
//   .catch(function(err){
//     console.log(err);
//   })
// })



module.exports = router;

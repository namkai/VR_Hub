'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { camelizeKeys } = require('humps');

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
    console.log(err);
  })
});

router.get('/home',function(req,res,next){
  res.render('home');
})

router.post('/register', function(req, res, next){

  var insert = {};
  insert.username = req.body.username;
  insert.password = req.body.password;
  insert.project = req.body.project;

  knex('users_projects').insert(insert).returning('*').then(function(data){
    console.log(data);
    res.send(data);
    console.log("hello");
  })
  .catch(function(err){
    console.log(err);
  })
})


module.exports = router;

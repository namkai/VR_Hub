"use strict";
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-as-promised');
var boom = require("boom");
var knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function(req,res,next){
  res.render('register');
})

router.post('/users', function(req, res, next){

  const {username, password} = req.body;

  if (!username){
    return next(boom.create(400, "username must not be blank"));
  }
  if (!password || password.length < 8){
    return next(boom.create(400, "password must be longer than 8 characters"));
  }

  console.log("before BCRPYT")
  bcrypt.hash(password, 12).then(function(hashedPassword){
    // let password = hashedPassword;
    const insertUser = {username, hashedPassword}
    return knex('users_projects').insert(insertUser,'*')

  }).then(function(rows){
    console.log(rows);
    const user = rows[0];
    delete user.hashedPassword;

    res.redirect('/home');
  })
  .catch(function(err){
    next(err);
  })
});



module.exports = router;

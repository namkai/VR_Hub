"use strict";

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();


router.get('/session', function(req, res, next){
  res.render('login');
})
router.post('/session', function(req, res, next){
  const {username, password} = req.body;
  console.log(req.body);
  if (username.length === 0){
    return next(boom.create(400, "username must not be blank"));
  }
  if (!password || password.length < 5){
    return next(boom.create(400, "insufficient password length"));
  }

  let user;
  knex('users_projects').where('username', username).first()
  .then(function(data){
    if(!data){
      throw boom.create(400, "bad email and password");
    }
    user = data;
   return bcrypt.compare(password, data.hashedPassword);
  })
  .then(function(){
    delete user.hashedPassword;
    req.session.userId = user.id;
    console.log(req.session);
    res.redirect('/home');
  })
  .catch(bcrypt.MISMATCH_ERROR, function(){
    throw boom.create(400, 'bad email or password');
  })
  .catch(function(err){
    next(err);
  })
})


router.delete('/logout',function(req,res,next){
  req.session.userId = null;
  console.log(req.session, "DELETEDSHIT");
  res.redirect(302, '/');

})

module.exports = router;

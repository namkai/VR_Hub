"use strict";
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_projects').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users_projects').insert({username: 'mikey', password: 'asdfg', project: 'www.google.com'}),
        knex('users_projects').insert({username: 'tracy', password: '12212', project: 'www.facebook.com'}),
        knex('users_projects').insert({username: 'momo', password: 'joeblack', project: 'www.twitter.com'})
      ]);
    });
};

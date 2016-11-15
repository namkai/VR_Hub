"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_projects', function(table){
    table.increments();
    table.string('username');
    table.string('hashedPassword');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_projects');
};

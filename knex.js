'use strict';

const environment = process.env.NODE_ENV || 'test'; // remember to switch back to development
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;

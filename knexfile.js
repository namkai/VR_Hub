'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/user_info'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/user_info_test'
  }
};

const knex = require ('knex');
const knexConfig = require ('../../../knexfile');
const db = knex (knexConfig.development);
module.exports = {
  getPosts: function () {
    return db ('posts');
  },
};

const knex = require ('knex');
const knexConfig = require ('../../../knexfile');
const db = knex (knexConfig.development);
module.exports = {
    getUsers: function(){
        return db('users')
    },
    getPostsWithUser: function (id) {
        return db('posts').where({ user_id: id })
    },
};

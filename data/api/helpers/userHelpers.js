const knex = require ('knex');
const knexConfig = require ('../../../knexfile');
const db = knex (knexConfig.development);
module.exports = {
    getUsers: function(){
        return db('users')
    },
    getPostsWithUser: function (id) {
        return db('posts').where({ userId: id })
    },
    getUserById: function (id) {
        const path = db('users').where({id})

        return db('users').where({ id })
    },
    deleteUser: function(id){

    }
};

const knex = require ('knex');
const knexConfig = require ('../../../knexfile');
const db = knex (knexConfig.development);
module.exports = {
    getUsers: function(){
        return db('users')
    },
    getUserById: function (id) {
        return db('users').where({ id })
    },
    getUserWithPosts: function (id) {
        return db('posts').where({ userId: id })
    },
    deleteUser: function(id){
        return db('users').where({ id }).del()
    },
    editUser: function(body, id){
        return db('users').where({ id }).update(body)
    }
};

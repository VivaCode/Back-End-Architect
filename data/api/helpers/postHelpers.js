const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig.development);
module.exports = {
    getPosts: function () {
        return db('posts')
    },
    postPosts: function(post){
        return db('posts').insert(post)
    },
    getPostById: function (id) {
        return db('posts').where({ id }).first()
    },
    deletePost: function (id) {
        return db('posts').where({ id }).del()
    }
};

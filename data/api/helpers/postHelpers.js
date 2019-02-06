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
    getPostsById: function(id){
        return db('posts').where(id).first()
    },
    deletePost: function (id) {
        return db('posts').where({ id }).del()
    },
    getUserWithPosts: function (id) {
        return db('posts').where({ userId: id })
    }
};

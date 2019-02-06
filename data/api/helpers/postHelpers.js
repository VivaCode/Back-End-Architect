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
    getPostById: function(id){
        return db('posts').where({ id }).first()
    },
    getUserWithPosts: function (id) {
        return db('posts').where({ userId: id })
    },
    deletePost: function (id) {
        return db('posts').where({ id }).del()
    },
    editPost: function(id, body){
        return db('posts').where({ id }).update( body )
    },
    incrementUpvotes: function(id, count){
        return db('posts').where({ id }).update({upvotes: count+ 1})
    }
};

const knex = require ('knex');
const knexConfig = require ('../../../knexfile');
const db = knex (knexConfig.development);


module.exports = {
    deletePost: function(id){
        return db('posts').where({ id }).del()
    }
}
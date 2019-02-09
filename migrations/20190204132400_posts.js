
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', tbl =>{
      tbl.increments();
      tbl.string('imageUrl').notNullable()
      tbl.integer('upvotes').notNullable()
      tbl.integer('userId').notNullable().unsigned().references('id').inTable('users')
      tbl.string('description')
      tbl.string('username').notNullable().unsigned().references('username').inTable('users')
      tbl.string('postName').notNullable()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts')
};


// {
//   "imageUrl": "https://images.pexels.com/photos/1867107/pexels-photo-1867107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     "postName": "the beach :)"
// }
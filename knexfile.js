// Update with your config settings.
require('dotenv').config();
const localPg = {
  host: 'localhost', 
  database: 'Database',
  user: process.env.DB_USERS,
  password: process.env.DB_PASS
};
const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/artDatabase.sqlite3'
    },
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true,
  }, 
  
  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
    },
    useNullAsDefault: true
  }
};





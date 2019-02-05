require('dotenv').config();

const express = require('express')
const server = express();
const auth = require('./data/api/routes/AuthRouter')
const user = require('./data/api/routes/userRouter')
const post = require ('./data/api/routes/postRouter')
const helper = require('./data/api/helpers/authHelpers')
server.use(express.json())
server.use('/api',auth)
server.use('/api/users', user)
server.use ('/api/posts', post)
server.get ('/', (req, res) => {
  res.send ();
});

module.exports = server;
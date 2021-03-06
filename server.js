require('dotenv').config();
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const server = express();
const auth = require('./data/api/routes/AuthRouter')
const user = require('./data/api/routes/userRouter')
const post = require ('./data/api/routes/postRouter')
const admin = require('./data/api/routes/adminRouter')
const helper = require('./data/api/helpers/authHelpers')
server.use(helmet())
server.use(express.json())
server.use(cors())
server.use('/api',auth)
server.use('/api/users', user)
server.use ('/api/posts', post)
server.use('/api/admin',admin)
server.get ('/', (req, res) => {
  res.send ();
});

module.exports = server;
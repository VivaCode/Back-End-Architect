const express = require('express')
const knex = require('knex')
const router = express.Router()
const helper = require('../helpers/authHelpers')
const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => {
    let user = req.body;
    if(!user.userImgUrl){
        user = {...user, userImgUrl:'https://images.pexels.com/photos/724994/pexels-photo-724994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
    }
    if (!user.username) {
        res.status (400).json ({errorMessage: 'missing username'});
        }
    if (!user.password) {
        res.status (400).json ({errorMessage: 'missing password'});
    }
    if (!user.fullName) {
        res.status (400).json ({errorMessage: 'missing users full name'});
    }
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash

    helper.registerUser(user)
        .then (result => {
        res.status (201).json (result);
        })
        .catch (err => res.status (500).json ({errorMessage:'error registering user.'}));
});

router.post ('/login', (req, res) => {
  const creds = req.body;
    if(!creds.username){
        res.status(400).json({message: 'missing username'})
    }
    if (!creds.password) {
        res.status (400).json ({message: 'missing password'});
        }
   helper.loginUser(creds)
   .then (user => {
      if (user && bcrypt.compareSync (creds.password, user.password)) {
        const token = helper.generateToken (user);
        res.status (200).json ({id: user.id,username: user.username, fullName: user.fullName, email: user.email, userImgUrl: user.userImgUrl, token});
      } else {
        res.status (401).json ({message: 'no token'});
      }
    })
    .catch (err => {
      res.status (500).json ({errorMessage: err});
    });
});

module.exports = router

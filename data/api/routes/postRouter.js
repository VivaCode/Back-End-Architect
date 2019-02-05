const express = require('express');
const knex = require('knex');
const router = express.Router();
const helper = require('../helpers/postHelpers')


router.get('/', (req, res) => {
    helper.getPosts()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json({ errorMessage: 'cant receive users' }))
})

router.post('/', (req, res) => {
    const post = req.body
    helper.postPosts(post)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => res.status(500).json({ errorMessage: 'cant receive users' }))
})




module.exports = router;
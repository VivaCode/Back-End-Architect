const express = require('express');
const knex = require('knex');
const router = express.Router();
const helper = require('../helpers/postHelpers')
const authHelper = require ('../helpers/authHelpers');
const lock = authHelper.lock;


router.get('/', (req, res) => {
    helper.getPosts()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json({ errorMessage: 'cant receive users' }))
})

router.post('/',lock, (req, res) => {
    const body = req.body
    const post = {...body,upvotes:0, userId: req.decodedToken.id}
    helper.postPosts(post)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => res.status(500).json({ errorMessage: 'cant receive users' }))
})

router.get ('/:id', (req, res) => {
  const id = req.params.id;
  helper.getPostById(id)
    .then (post => {
      res.status (200).json (post);
    })
    .catch (err => {
      res.status (500).json ({errorMessage: 'error retrieving post'});
    });
});

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    helper.getUserWithPosts(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error retrieving posts' });
        });
});


router.delete('/:id', lock, async(req, res) => {
    const id = req.params.id
    const body = await helper.getPostById(id)
    if (body.userId != req.decodedToken.id) {
        return res.status(403).json({ errorMessage: "you are not authorized to delete this post" })
    }
    try{
        helper.deletePost(id)
            .then(result => {
                res.status(200).json({ message: "post successfully deleted" })
            })
    }
    catch(err){
        res.status(500).json({ errorMessage: "error deleting user" })
    }
})

module.exports = router;
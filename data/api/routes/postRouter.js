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

router.post('/', (req, res) => {
    const post = req.body
    helper.postPosts(post)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => res.status(500).json({ errorMessage: 'cant receive users' }))
})

router.get ('/:id', (req, res) => {
  const id = req.params.id;
  helper
    .getPostById (id)
    .then (post => {
      res.status (200).json (post);
    })
    .catch (err => {
      res.status (500).json ({errorMessage: 'error retrieving posts'});
    });
});

router.delete('/:id', lock, (req, res) => {
    const id = req.params.id;

    helper.deletePost(id).then(post => {
        res.status(200).json()
    })

})


module.exports = router;
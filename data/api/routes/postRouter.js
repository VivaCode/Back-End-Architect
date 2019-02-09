const express = require('express');
const knex = require('knex');
const router = express.Router();
const helper = require('../helpers/postHelpers')
const authHelper = require ('../helpers/authHelpers');
const lock = authHelper.lock;

router.post('/', lock, (req, res) => {
    const body = req.body
    const post = { ...body, upvotes: 0, userId: req.decodedToken.id, username: req.decodedToken.username }
    helper.postPosts(post)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(err => res.status(500).json({ errorMessage: 'cant create post' }))
})

router.get('/', (req, res) => {
    helper.getPosts()
        .then(users => {
            res.status(200).json(users)
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
router.put('/upvote/:id',async(req,res)=>{
    const id = req.params.id;
    const body = await helper.getPostById(id);
    const upvotes = body.upvotes;
    try{
        helper.incrementUpvotes (id, upvotes).then(result=>{
            res.status(200).json({upvotes: upvotes + 1})
        })
    }
    catch(err){
        res.status(500).json({errorMessage: 'could not upvote this post'})
    }
})

router.put('/:id',lock, async(req,res)=>{
    const id = req.params.id
    const body = req.body
    const oldBody = await helper.getPostById(id)
    if(oldBody.userId != req.decodedToken.id){
        return res.status(401).json({errorMessage: "not authorized to edit this post"})
    }
    try{
        helper.editPost(id, body)
            .then(post => {
                res.status(200).json({message: "your post has been edited"})
            })
    }
    catch(err){
        res.status(500).json({ errorMessage: "could not edit post" })
    }
})
router.delete('/:id', lock, async(req, res) => {
    const id = req.params.id
    const body = await helper.getPostById(id)
    if (body.userId != req.decodedToken.id) {
        return res.status(401).json({ errorMessage: "you are not authorized to delete this post" })
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
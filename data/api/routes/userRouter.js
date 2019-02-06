const express = require ('express');
const knex = require ('knex');
const router = express.Router ();
const helper = require('../helpers/userHelpers')


router.get('/', (req,res)=>{
    helper.getUsers()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err=> res.status(500).json({errorMessage: 'cant receive users'}))
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    helper.getUserById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error retrieving posts' });
        });
});

router.get('/posts/:id', (req, res) => {
    const id = req.params.id
    helper.getUserById(id)
        .then(user => {
            helper.getUserWithPosts(id)
            .then(posts =>{
                const userObj = user[0];
                userObj.posts = posts;
                res.status(200).json(user)
            })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error retrieving user' })
        })
})
    

module.exports = router;
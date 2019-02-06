const express = require ('express');
const knex = require ('knex');
const router = express.Router ();
const helper = require('../helpers/userHelpers')
const authHelper = require('../helpers/authHelpers');
const lock = authHelper.lock;

router.get('/', (req,res)=>{
    helper.getUsers()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err=> res.status(500).json({errorMessage: 'cant receive users'}))
})
router.get('/:id',lock, (req, res) => {
    const id = req.params.id;
    helper.getUserById(id)
        .then(post => {
            res.status(200).json(req.decodedToken);
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


router.delete('/:id',lock, (req,res)=>{
    const id = req.params.id;
    if(req.decodedToken.id!= id){
        res.status(403).json({errorMessage: 'you are not authorized to delete this account'})
    }
    helper.deleteUser(id)
    .then(user=>{
        res.status(200).json({errorMessage: 'your account has been deleted'})
    })
    .catch(err=>{
        res.status(500).json({errorMessage: 'user cannot be deleted'})
    })
})
module.exports = router;
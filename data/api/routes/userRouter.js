const express = require ('express');
const knex = require ('knex');
const router = express.Router ();
const helper = require('../helpers/userHelpers')
const authHelper = require('../helpers/authHelpers');
const lock = authHelper.lock;
const bcrypt = require('bcryptjs');

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
        .then(user => {
            res.status(200).json(user);
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

router.put('/:id', lock, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (req.decodedToken.id != id) {
        return res.status(401).json({ errorMessage: 'you are not authorized to edit this account' })
    }
    if(body.password){
        const hash = bcrypt.hashSync(body.password, 12);
        body.password = hash;
    }
    helper.editUser(body, id)
        .then(user => {
            res.status(200).json({ message: 'your account has been edited' })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'user cannot be edited' })
        })
})
router.delete('/:id',lock, async(req,res)=>{
    const id = req.params.id;
    if(req.decodedToken.id!= id){
        return res.status(401).json({errorMessage: 'you are not authorized to delete this account'})
    }
    try{
        helper.deleteAllPostByUser(id).then(
            res.json({message: 'users post deleted'})
        )
        helper.deleteUser (id).then (user => {
        res.status (200).json ({message: 'your account has been deleted'});
    });

    }
    catch(err){
        res.status (500).json ({errorMessage: 'user cannot be deleted'});

    }
})
module.exports = router;
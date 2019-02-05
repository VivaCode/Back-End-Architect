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
    helper
        .getPostById(id)
        .then(post => {
            helper.getPostsWithUser(id).then(posts => {

            })
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error retrieving posts' });
        });
});

module.exports = router;
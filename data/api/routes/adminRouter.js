const express = require ('express');
const knex = require ('knex');
const router = express.Router();
const helper = require ('../helpers/adminHelpers');
const authHelper = require('../helpers/authHelpers')
const adminCheck = authHelper.adminCheck


router.delete('/posts/:id',adminCheck, (req,res)=>{
    const id = req.params.id;
    helper.deletePost(id)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({message:'could not delete post'})
    })
})

module.exports = router;
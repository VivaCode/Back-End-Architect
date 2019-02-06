const knex = require('knex');
const knexConfig = require('../../../knexfile')
const db = knex(knexConfig.development)
const jwt = require('jsonwebtoken')
const env = require ('dotenv').config ();
module.exports = {
    lock: function(req,res,next){
        const token = req.headers.authorization;
            if (token) {
                jwt.verify (token, process.env.JWT_SECRET, (err, decodedToken) => {
                    if (err) {
                        res.status (403).json ({message: 'invalid token'});
                    }else {
                        req.decodedToken = decodedToken;
                        next ();
                    }
                });
            } else {
                res.status (401).json ({
                    message: 'missing token',
                    });
                }

    },

    generateToken: function(user){
        const payload = {
            id: user.id,
        }
        const secret = process.env.JWT_SECRET
        const options = {
            expiresIn: '45m',
        }
        return jwt.sign(payload, secret, options)
    },
    registerUser: function(user){
        return db.insert(user).into('users')
    },
    loginUser: function(creds){
        return db('users').where ({username: creds.username}).first ();
    }
}
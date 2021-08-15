const router = require('express').Router();
const {Post, Comment, User} = require('../models/');

router.get('/',async (req,res) =>{

    try{
        Post.findAll({
            attributes: [
                'id',
                'title',
                'postURL',
                'createdAt'
            ],

        })
    } catch(err){

    }

});

router.get('/post/:id', async (req,res) =>{

});

module.exports = router;
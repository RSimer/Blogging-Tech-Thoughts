const router = require('express').Router();
const {Post, Comment, User} = require('../models/');

router.get('/',async (req,res) =>{

    try{

       const postAttr = await Post.findAll({
            attributes: [
                'id',
                'title',
                'postURL',
                'createdAt'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id','commentText','post_id','user_id','createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const postMap = postAttr.map((post) =>{
            return post.get({plain: true});
        });

        res.render('homepage',{
            postMap,
            logged_in: req.session.logged_in

        });
    } catch(err){
        res.status(400).json(err);
    }

});

router.get('/post/:id', async (req,res) =>{

    try{
        const postAttr = await Post.findByPk(req.params.id,{
            attributes: [
                'id',
                'title',
                'postURL',
                'createdAt'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id','commentText','post_id','user_id','createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const post = postAttr.get({ plain: true });

        res.render('post', {
          ...post,
          logged_in: req.session.logged_in
        });

    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/login',(req,res)=>{
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
router.get('/signup',(req,res)=>{
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

module.exports = router;
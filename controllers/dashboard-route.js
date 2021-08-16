const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
   const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    const postMap = postData.map((post)=>{
        post.get({plain:true});
        res.render('dashboard',{postMap, logged_in:true});
    })
 }catch (err){
    res.status(500).json(err);
}
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try{
    const postEdit =  await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    const post = postEdit.get({plain:true});
    res.render('edit-post',{
        post,
        logged_in: true
    });
}catch{
    res.status(500).json(err);
}
router.get('/createPost', withAuth, (req, res) => {
    
    res.render('create-post');
})
});

module.exports = router;
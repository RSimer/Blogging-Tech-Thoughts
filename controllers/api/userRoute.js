const router = require('express').Router();
const {Post, Comment, User} = require('../../models/');
const withAuth = require('../../utils/auth');


router.get('/', async (req,res) =>{

    try{
        const userFind = await User.getAll({
            attributes: {exclude: ['password']}
        });
        res.status(200).json(userFind);
    } catch(err){
        res.status(400).json(err);
    }

});

router.get('/:id', async (req,res) =>{
    try{
        const userFindOne = await User.FindOne({
            where: {id: req.params.id},
            attributes: {exclude:['password']},
            include: [
                {
                    model: Post,
                    attributes: ['id','title','postURL','createdAt']
                },
                {
                    model: Comment,
                    attributes: ['id','commentText','createdAt'],
                    include: {
                        model: Post, attributes: ['title']
                    }
                }
                ]
        });
        res.status(200).json(userFindOne);
    } catch(err){

    }
})


router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
          username: req.body.username,
          password: req.body.password
      });
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });



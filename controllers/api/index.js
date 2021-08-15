const router = require('express').Router();
const commentRoute = require('./comment-routes');
const postRoutes = require('./post-routes');
const userRoute = require('./userRoute');

router.use('/comment',commentRoute);
router.use('/post',postRoutes);
router.use('/user',userRoute);

module.exports = router;
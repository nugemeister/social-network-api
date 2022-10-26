const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use((err, req, res, next) => {
    if(err) {
        console.log(err)
    }
    next();
})

// export
module.exports = router;
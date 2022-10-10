const router = require('express').Router();

// Import Info from User Controller File
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// Route for api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// Route for api/user/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Route for api/users/:userId/friends/:friendId
router.route('/:userID/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

// export
module.exports = router;
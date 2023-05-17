const router = require('express').Router();
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../controllers/userController');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/api/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
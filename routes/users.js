const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:_id', getUserById);
router.post('/users', createUser);

module.exports = router;

const { Router } = require('express');
const {
    findAllUsers,
    findUserById,
    createUser,
    updateUserById,
    deleteUserById,
} = require('./index');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.post('/', createUser);

router.put('/', updateUserById);

router.delete('/', deleteUserById);

module.exports = router;

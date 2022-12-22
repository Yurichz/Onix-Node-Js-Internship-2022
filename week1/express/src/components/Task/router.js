const { Router } = require('express');
const {
    findTaskById,
    findTaskByUserId,
    getTasksByPage,
    createTask,
    patchTaskById,
    updateTaskById,
    deleteTaskById,
} = require('./index');

const router = Router();

router.get('/all', findTaskByUserId);

router.get('/:id', findTaskById);

router.get('/', getTasksByPage);

router.post('/', createTask);

router.put('/', updateTaskById);

router.patch('/:id', patchTaskById);

router.delete('/', deleteTaskById);

module.exports = router;

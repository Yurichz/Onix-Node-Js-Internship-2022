const { Router } = require('express');
const {
    findAllTasks,
    findTaskById,
    findTaskByUserId,
    createTask,
    updateTaskById,
    deleteTaskById,
} = require('./index');

const router = Router();

router.get('/', findAllTasks);

router.get('/my-tasks', findTaskByUserId);

router.get('/:id', findTaskById);

router.post('/', createTask);

router.put('/', updateTaskById);

router.delete('/', deleteTaskById);

module.exports = router;

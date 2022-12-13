const TaskService = require('./service');
const TaskValidation = require('./validation');
const handleOk = require('../../filters/handleOk');
const ValidationError = require('../../error/ValidationError');

const findAllTasks = async (req, res, next) => {
    try {
        const allTasks = await TaskService.findAll();

        return handleOk(res, allTasks);
    } catch (err) {
        return next(err);
    }
};

const findTaskById = async (req, res, next) => {
    try {
        const { error } = TaskValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        console.log(req.params);

        const task = await TaskService.findById(req.params.id);

        return handleOk(res, task);
    } catch (err) {
        return next(err);
    }
};

const findTaskByUserId = async (req, res, next) => {
    try {
        const { error } = TaskValidation.findByUserId(req.user.id);

        if (error) {
            throw new ValidationError(error.details);
        }

        const tasks = await TaskService.findTaskByUserId(req.user.id);

        return handleOk(res, tasks);
    } catch (err) {
        return next(err);
    }
};

const createTask = async (req, res, next) => {
    try {
        const { error } = TaskValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const taskProfile = {
            userId: req.user.id,
            ...req.body,
        };

        const task = await TaskService.create(taskProfile);

        return handleOk(res, task);
    } catch (err) {
        return next(err);
    }
};

const updateTaskById = async (req, res, next) => {
    try {
        const { error } = TaskValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const task = await TaskService.updateById(req.body.id, req.body);

        return handleOk(res, task);
    } catch (err) {
        return next(err);
    }
};

const deleteTaskById = async (req, res, next) => {
    try {
        const { error } = TaskValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const task = await TaskService.deleteById(req.body.id);

        return handleOk(res, task);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    findAllTasks,
    findTaskById,
    findTaskByUserId,
    createTask,
    updateTaskById,
    deleteTaskById,
};

const { Types } = require('mongoose');
const TaskModel = require('./model');
const UserModel = require('../User/model');
const { limitTasks } = require('./constants');


function findById(id) {
    return TaskModel.findById(id).exec();
}

function findTaskByUserId(userId) {
    return UserModel.aggregate([
        {
            $match: {
                _id: Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: 'taskmodels',
                localField: '_id',
                foreignField: 'assignee',
                as: 'tasks',
            },
        },
        {
            $addFields: {
                name: {
                    $concat: ['$firstName', ' ', '$lastName'],
                },
            },
        },
        {
            $unwind: {
                path: '$tasks',
            },
        },
        {
            $group: {
                _id: null,
                tasks: {
                    $push: '$tasks',
                },
                name: { $first: '$name' },
                totalTasks: { $sum: 1 },
                totalEstimation: { $sum: '$tasks.estimatedTime' },
            },
        },
        {
            $project: {
                _id: 0,
                firstName: 0,
                lastName: 0,
                email: 0,
                password: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
    ]);
}

function create(profile) {
    return TaskModel.create(profile);
}

function updateById(_id, newProfile) {
    return TaskModel.updateOne({ _id }, newProfile).exec();
}

function deleteById(_id) {
    return TaskModel.deleteOne({ _id }).exec();
}

async function getTasksByPage(page, assignee) {
    const taskQuery = TaskModel.find({ assignee });
    const tasks = await taskQuery.clone().skip(page * limitTasks).limit(limitTasks);
    const taskCount = await taskQuery.count();

    return {
        tasks,
        totalTasks: taskCount,
    };
}

module.exports = {
    findById,
    findTaskByUserId,
    getTasksByPage,
    create,
    updateById,
    deleteById,
};

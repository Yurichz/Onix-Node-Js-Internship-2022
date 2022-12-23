const { Types } = require('mongoose');
const TaskModel = require('./model');
const { limitTasks } = require('./constants');


function findById(id) {
    return TaskModel.findById(id).exec();
}

function findTaskByUserId(userId) {
    return TaskModel.aggregate([
        {
            $facet: {
                tasks: [{
                    $match: {
                        assignee: Types.ObjectId(userId),
                    },
                }],
            },
        },
        {
            $lookup: {
                from: 'usermodels',
                localField: 'tasks.assignee',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $addFields: {
                name: {
                    $concat: ['$user.firstName', ' ', '$user.lastName'],
                },
            },
        },
        {
            $unwind: '$tasks',
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

const TaskModel = require('./model');

function findAll() {
    return TaskModel.find({}).exec();
}

function findById(id) {
    return TaskModel.findById(id).exec();
}

function findTaskByUserId(userId) {
    return TaskModel.find({ userId });
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

module.exports = {
    findAll,
    findById,
    findTaskByUserId,
    create,
    updateById,
    deleteById,
};

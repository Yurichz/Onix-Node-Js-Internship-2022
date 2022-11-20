const UserModel = require('./model');

function findAll() {
    return UserModel.find({}).exec();
}

function findById(id) {
    return UserModel.findById(id).exec();
}

function findByEmail(email) {
    return UserModel.findOne({ email }).exec();
}

function create(profile) {
    return UserModel.create(profile);
}

function updateById(_id, newProfile) {
    return UserModel.updateOne({ _id }, newProfile).exec();
}

function deleteById(_id) {
    return UserModel.deleteOne({ _id }).exec();
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    deleteById,
};
